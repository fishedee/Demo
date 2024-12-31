import { Button } from 'antd';

const solver = require("javascript-lp-solver"); // 如果是浏览器，去掉这行

function solveCut() {

    // 定义规格和需求
    const specs = { "3m": 3, "1.2m": 1.2, "2.1m": 2.1 };
    const demand = { "3m": 3, "1.2m": 5, "2.1m": 8 };
    const maxLength = 6;

    // 动态生成切割方案
    function generateCuttingPatterns(specs, maxLength) {
        const patterns = [];
        const specNames = Object.keys(specs);

        // 递归生成所有可能的切割方案
        function backtrack(index, currentPattern, remainingLength) {
            if (remainingLength < 0) return;
            if (index === specNames.length) {
                patterns.push(currentPattern);
                return;
            }
            const spec = specNames[index];
            const specLength = specs[spec];
            for (let count = 0; count <= Math.floor(remainingLength / specLength); count++) {
                const newPattern = { ...currentPattern, [spec]: count };
                backtrack(index + 1, newPattern, remainingLength - count * specLength);
            }
        }

        backtrack(0, {}, maxLength);
        return patterns;
    }

    // 生成切割方案
    const cuttingPatterns = generateCuttingPatterns(specs, maxLength);

    // 第一阶段：优化使用的钢材数量
    const stage1Model = {
        optimize: "totalBars", // 目标是最小化使用的钢材总数
        opType: "min",
        constraints: {},
        variables: {},
        ints: {},
    };

    // 添加约束条件
    for (const spec in demand) {
        stage1Model.constraints[spec] = { min: demand[spec] };
    }

    // 添加变量（每个切割方案）
    for (let i = 0; i < cuttingPatterns.length; i++) {
        const pattern = cuttingPatterns[i];
        const varName = `x${i}`;
        stage1Model.variables[varName] = { totalBars: 1, ...pattern };
        stage1Model.ints[varName] = 1; // 变量为整数
    }

    // 求解第一阶段问题
    const stage1Result = solver.Solve(stage1Model);
    const minTotalBars = stage1Result.totalBars;

    // 第二阶段：在满足钢材数量最少的前提下，优化使用的切割方案数量
    const stage2Model = {
        optimize: "totalPatterns", // 目标是最小化使用的切割方案数量
        opType: "min",
        constraints: { ...stage1Model.constraints, totalBars: { equal: minTotalBars } },
        variables: {},
        ints: {},
    };

    // 添加变量（每个切割方案）
    for (let i = 0; i < cuttingPatterns.length; i++) {
        const pattern = cuttingPatterns[i];
        const varName = `x${i}`;
        const yVarName = `y${i}`;
        stage2Model.variables[varName] = { totalBars: 1, totalPatterns: 1, ...pattern };
        stage2Model.variables[yVarName] = { totalPatterns: 1 };
        stage2Model.ints[varName] = 1; // x_j 为整数
        stage2Model.ints[yVarName] = 1; // y_j 为整数
        stage2Model.constraints[yVarName] = { min: 0, max: 1 }; // y_j 为二进制变量
        stage2Model.constraints[`${varName}_limit`] = { max: 1000 * stage2Model.variables[yVarName] }; // x_j <= M * y_j
    }

    // 求解第二阶段问题
    const stage2Result = solver.Solve(stage2Model);

    // 输出结果
    console.log("Optimal Solution:");
    for (let i = 0; i < cuttingPatterns.length; i++) {
        const varName = `x${i}`;
        if (stage2Result[varName] > 0) {
            console.log(`Pattern ${i + 1}: ${stage2Result[varName]} times`, cuttingPatterns[i]);
        }
    }
    console.log("Total Steel Bars Used:", stage2Result.totalBars);
    console.log("Total Cutting Patterns Used:", stage2Result.totalPatterns);
}
const App: React.FC = () => {
    return <div>
        <Button type="primary" onClick={() => {
            solveCut();
        }}>点我</Button>
    </div>
}

export default App;