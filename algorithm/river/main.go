package main

import ()

type ResultStep struct {
	Boat []int
}

type Result struct {
	Steps []ResultStep
}

type Condition struct {
	CheckSide func([]byte) bool
	CheckBoat func([]byte) bool
	Size      int
}

type cacheInfo struct {
	visitRight map[string]bool
	visitLeft  map[string]bool
}

func isEnd(right []byte) bool {
	for i := 0; i != len(right); i++ {
		if right[i] == 0 {
			return false
		}
	}
	return true
}

func dump(left []byte) string {
	result := []byte{}
	for i := 0; i != len(left); i++ {
		if left[i] == 1 {
			result = append(result, byte(i)+'0')
		}
	}
	return "`" + string(result) + "`"
}

type nextSearchFunc func(left []byte, right []byte, curStep []string) bool

func searchTwo(left []byte, right []byte, condition Condition, curStep []string, nextFunc nextSearchFunc) bool {
	//一边岸和船上的人
	allPassenger := []int{}
	for i := 0; i != len(left); i++ {
		if left[i] == 1 {
			allPassenger = append(allPassenger, i)
		}
	}
	boat := make([]byte, condition.Size, condition.Size)
	//双人上船尝试
	for m := 0; m != len(allPassenger); m++ {
		for l := m + 1; l != len(allPassenger); l++ {
			i := allPassenger[m]
			j := allPassenger[l]
			//上船
			left[i] = 0
			left[j] = 0
			right[i] = 1
			right[j] = 1
			boat[i] = 1
			boat[j] = 1
			if condition.CheckSide(left) == false {
				left[i] = 1
				left[j] = 1
				right[i] = 0
				right[j] = 0
				boat[i] = 0
				boat[j] = 0
				continue
			}
			if condition.CheckBoat(boat) == false {
				left[i] = 1
				left[j] = 1
				right[i] = 0
				right[j] = 0
				boat[i] = 0
				boat[j] = 0
				continue
			}
			curStep = append(curStep, string(boat))
			isOk := nextFunc(left, right, curStep)
			if isOk == true {
				return true
			}
			curStep = curStep[0 : len(curStep)-1]
			left[i] = 1
			left[j] = 1
			right[i] = 0
			right[j] = 0
			boat[i] = 0
			boat[j] = 0
		}
	}
	return false
}
func searchOne(left []byte, right []byte, condition Condition, curStep []string, nextFunc nextSearchFunc) bool {
	//一边岸和船上的人
	allPassenger := []int{}
	for i := 0; i != len(left); i++ {
		if left[i] == 1 {
			allPassenger = append(allPassenger, i)
		}
	}
	boat := make([]byte, condition.Size, condition.Size)
	//单人上船尝试
	for m := 0; m != len(allPassenger); m++ {
		i := allPassenger[m]
		//上船
		left[i] = 0
		right[i] = 1
		boat[i] = 1
		if condition.CheckSide(left) == false {
			left[i] = 1
			right[i] = 0
			boat[i] = 0
			continue
		}
		if condition.CheckBoat(boat) == false {
			left[i] = 1
			right[i] = 0
			boat[i] = 0
			continue
		}
		curStep = append(curStep, string(boat))
		isOk := nextFunc(left, right, curStep)
		if isOk == true {
			return true
		}
		curStep = curStep[0 : len(curStep)-1]
		left[i] = 1
		right[i] = 0
		boat[i] = 0
	}
	return false
}

func solveToLeft(left []byte, right []byte, cache cacheInfo, condition Condition, curStep []string, result *Result) bool {
	if isEnd(right) == true {
		steps := []ResultStep{}
		for i := 0; i != len(curStep); i++ {
			step := []int{}
			for index, hasChoose := range []byte(curStep[i]) {
				if hasChoose == 1 {
					step = append(step, index)
				}
			}
			steps = append(steps, ResultStep{
				Boat: step,
			})
		}
		result.Steps = steps
		return true
	}
	_, isExist := cache.visitLeft[string(right)]
	if isExist {
		return false
	}
	cache.visitLeft[string(right)] = true
	isTotalOk := searchOne(
		right,
		left,
		condition,
		curStep,
		func(left []byte, right []byte, curStep []string) bool {
			return solveToRight(right, left, cache, condition, curStep, result)
		},
	)
	if isTotalOk {
		return true
	}
	isTotalOk2 := searchTwo(
		right,
		left,
		condition,
		curStep,
		func(left []byte, right []byte, curStep []string) bool {
			return solveToRight(right, left, cache, condition, curStep, result)
		},
	)
	if isTotalOk2 {
		return true
	}
	delete(cache.visitLeft, string(right))
	return isTotalOk
}

func solveToRight(left []byte, right []byte, cache cacheInfo, condition Condition, curStep []string, result *Result) bool {
	_, isExist := cache.visitRight[string(left)]
	if isExist {
		return false
	}
	cache.visitRight[string(left)] = true
	isTotalOk := searchTwo(
		left,
		right,
		condition,
		curStep,
		func(left []byte, right []byte, curStep []string) bool {
			return solveToLeft(left, right, cache, condition, curStep, result)
		},
	)
	if isTotalOk {
		return true
	}
	isTotalOk2 := searchOne(
		left,
		right,
		condition,
		curStep,
		func(left []byte, right []byte, curStep []string) bool {
			return solveToLeft(left, right, cache, condition, curStep, result)
		},
	)
	if isTotalOk2 {
		return true
	}
	delete(cache.visitRight, string(left))
	return isTotalOk
}

func Solve(condition Condition) Result {
	left := make([]byte, condition.Size, condition.Size)
	right := make([]byte, condition.Size, condition.Size)
	for i := 0; i != len(left); i++ {
		left[i] = 1
		right[i] = 0
	}
	cache := cacheInfo{
		visitRight: map[string]bool{},
		visitLeft:  map[string]bool{},
	}
	result := Result{}
	curStep := []string{}
	solveToRight(left, right, cache, condition, curStep, &result)
	return result
}
