package insert_sort;

import (
)
func MonoIncrStack(data []int) []int{
	stack := make([]int,0,len(data))
	for i :=0;i < len(data) ;i++{
		ri := data[i]

		if len(stack) == 0 {
			stack = append(stack,ri)
		}else{
			index := len(stack) - 1
			pops := make([]int,0,len(stack))
			for{
				if index < 0 || stack[index] <= ri{
					stack = append(stack,ri)
					for j := len(pops) -1;j>=0;j--{
						stack = append(stack,pops[j])
					}
					break
				}
				pops = append(pops,stack[index])
				stack = stack[:index]
				index--
			}
		}
	}
	return stack
}

func InsertSort(data []int)[]int{
	n := len(data)
	stack := make([]int,n,n)

	for i := 0 ;i < n;i++{
		stack[i] = data[i]
	}

	for i := 1 ; i< n;i++{
		temp := stack[i]
		j := i-1
		for ;j >=0;j--{
			if stack[j] <= temp{
				break
			}
			stack[j+1] = stack[j]
		}
		stack[j+1] = temp
	}

	return stack
}