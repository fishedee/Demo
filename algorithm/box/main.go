package main

import (
	. "github.com/fishedee/language"
	"sort"
	"strconv"
)

func findSumInner(data []int, maxSum int) map[int]map[string]bool {
	if len(data) == 0 {
		return map[int]map[string]bool{}
	}
	//不包含自身数值
	leftDataResult := findSumInner(data[1:], maxSum)
	//只包含自身数值
	dataFirstStr := strconv.Itoa(data[0])
	if maxSum >= data[0] {
		oldValue, isExist := leftDataResult[data[0]]
		if isExist == false {
			oldValue = map[string]bool{}
			leftDataResult[data[0]] = oldValue
		}
		oldValue[dataFirstStr] = true
	}
	//包含自身和其他数值
	if maxSum-data[0] > 0 {
		rightDataResult := findSumInner(data[1:], maxSum-data[0])
		for key, value := range rightDataResult {
			newKey := key + data[0]
			for singleValue, _ := range value {
				newValue := singleValue + "_" + dataFirstStr
				oldValue, isExist := leftDataResult[newKey]
				if isExist == false {
					oldValue = map[string]bool{}
					leftDataResult[newKey] = oldValue
				}
				oldValue[newValue] = true
			}
		}
	}

	return leftDataResult
}

func findSum(data []int, maxSum int) map[int]map[string]bool {
	newData := append([]int{}, data...)
	sort.Ints(newData)
	return findSumInner(newData, maxSum)
}

type ResultStep struct {
	Data []int
}

type Result struct {
	Steps []ResultStep
}

type Condition struct {
	MaxSum int
	Data   []int
}

func getLeftData(data []int, useDataStr string) []int {
	useData := ExplodeInt(useDataStr, "_")
	sort.Ints(data)
	sort.Ints(useData)
	newData := make([]int, 0, len(data)-len(useData))
	i := 0
	j := 0
	for i < len(data) && j < len(useData) {
		if data[i] == useData[j] {
			i++
			j++
		} else if data[i] < useData[j] {
			newData = append(newData, data[i])
			i++
		} else {
			panic("error!")
		}
	}
	for i < len(data) {
		newData = append(newData, data[i])
		i++
	}
	return newData
}

func solveInner(maxSum int, data []int, step []string, result *Result) {
	if len(data) == 0 {
		if len(result.Steps) == 0 ||
			len(step) < len(result.Steps) {
			result.Steps = []ResultStep{}
			for _, singleStep := range step {
				result.Steps = append(result.Steps, ResultStep{
					Data: ExplodeInt(singleStep, "_"),
				})
			}
		}
		return
	}
	sumList := findSum(data, maxSum)
	var maxSumList map[string]bool
	maxSumResult := 0
	for sum, list := range sumList {
		if sum > maxSumResult {
			maxSumResult = sum
			maxSumList = list
		}
	}
	for list, _ := range maxSumList {
		step = append(step, list)
		leftData := getLeftData(data, list)
		solveInner(maxSum, leftData, step, result)
		step = step[0 : len(step)-1]
	}
}

func Solve(condition Condition) Result {
	var result Result
	step := []string{}
	solveInner(condition.MaxSum, condition.Data, step, &result)
	return result
}
