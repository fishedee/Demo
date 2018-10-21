package main

type ConditionItem struct {
	Weight int
	Value  int
}

type Condition struct {
	TotalWeight int
	Items       []ConditionItem
}

type ResultItem struct {
	Index int
}

type Result struct {
	TotalValue int
	Items      []ResultItem
}

func solveInner(cache [][]int, weight int, itemIndex int, conditionItems []ConditionItem) int {
	if itemIndex < 0 {
		return 0
	}
	if weight <= 0 {
		return 0
	}
	if cache[weight][itemIndex] != -1 {
		return cache[weight][itemIndex]
	}
	value1 := 0
	if weight >= conditionItems[itemIndex].Weight {
		value1 = solveInner(cache, weight-conditionItems[itemIndex].Weight, itemIndex-1, conditionItems) + conditionItems[itemIndex].Value
	}
	value2 := solveInner(cache, weight, itemIndex-1, conditionItems)
	maxValue := 0
	if value1 >= value2 {
		maxValue = value1
	} else {
		maxValue = value2
	}
	cache[weight][itemIndex] = maxValue
	return maxValue
}

func Solve(condition Condition) Result {
	totalWeight := condition.TotalWeight
	itemSize := len(condition.Items)
	cache := make([][]int, totalWeight+1, totalWeight+1)
	for i := 0; i != len(cache); i++ {
		cache[i] = make([]int, itemSize, itemSize)
		for j := 0; j != len(cache[i]); j++ {
			cache[i][j] = -1
		}
	}
	maxValue := solveInner(cache, totalWeight, itemSize-1, condition.Items)

	resultIndex := make([]int, itemSize, itemSize)
	resultWeight := totalWeight
	for i := len(resultIndex) - 1; i > 0; i-- {
		if cache[resultWeight][i] == cache[resultWeight][i-1] {
			resultIndex[i] = 0
		} else {
			resultIndex[i] = 1
			resultWeight -= condition.Items[i].Weight
		}
	}

	if resultWeight > 0 {
		resultIndex[0] = 1
	} else {
		resultIndex[0] = 0
	}

	result := Result{}
	result.TotalValue = maxValue
	for singleIndex, singleIndexValue := range resultIndex {
		if singleIndexValue == 1 {
			result.Items = append(result.Items, ResultItem{
				Index: singleIndex,
			})
		}
	}
	return result
}
