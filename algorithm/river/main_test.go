package main

import (
	. "github.com/fishedee/assert"
	"testing"
)

func Test1(t *testing.T) {
	//一个人领一只狼和两只羊过河,一次只能带一只动作物过河,人不在狼会吃羊
	//0=人，1=狼，2=羊1，3=羊2
	result := Solve(Condition{
		Size: 4,
		CheckSide: func(data []byte) bool {
			if data[0] == 0 && data[1] == 1 {
				if data[2] == 1 || data[3] == 1 {
					return false
				}
			}
			return true
		},
		CheckBoat: func(data []byte) bool {
			if data[0] == 0 {
				return false
			}
			return true
		},
	})
	AssertEqual(t, result, Result{
		Steps: []ResultStep{
			{[]int{0, 1}},
			{[]int{0}},
			{[]int{0, 2}},
			{[]int{0, 1}},
			{[]int{0, 3}},
			{[]int{0}},
			{[]int{0, 1}},
		},
	})
}

func Test2(t *testing.T) {
	//猎人、狼、男人和两个孩子、女人和两个孩子要过河，必须满足的条件：
	//1.只有一条每次过两个人的船
	//2.狼不能离开猎人同任何人独处
	//3.男人的孩子不能与女人独处
	//4.女人的孩子也不能与男人独处
	//5.只有猎人、男人和女人会划船
	//0=狼，1=猎人，2=男人，3=男孩1，4=男孩2，5=女人，6=女孩1，7=女孩2
	result := Solve(Condition{
		Size: 8,
		CheckSide: func(data []byte) bool {
			if data[0] == 1 && data[1] == 0 {
				if data[2] == 1 ||
					data[3] == 1 ||
					data[4] == 1 ||
					data[5] == 1 ||
					data[6] == 1 ||
					data[7] == 1 {
					return false
				}
			}
			if data[2] == 0 && (data[3] == 1 || data[4] == 1) && data[5] == 1 {
				return false
			}
			if data[5] == 0 && (data[6] == 1 || data[7] == 1) && data[2] == 1 {
				return false
			}
			return true
		},
		CheckBoat: func(data []byte) bool {
			if data[1] == 0 &&
				data[2] == 0 &&
				data[5] == 0 {
				return false
			}
			if data[0] == 1 && data[1] == 0 {
				if data[2] == 1 ||
					data[3] == 1 ||
					data[4] == 1 ||
					data[5] == 1 ||
					data[6] == 1 ||
					data[7] == 1 {
					return false
				}
			}
			if data[2] == 0 && (data[3] == 1 || data[4] == 1) && data[5] == 1 {
				return false
			}
			if data[5] == 0 && (data[6] == 1 || data[7] == 1) && data[2] == 1 {
				return false
			}
			return true
		},
	})
	AssertEqual(t, result, Result{
		Steps: []ResultStep{
			{[]int{0, 1}},
			{[]int{1}},
			{[]int{1, 3}},
			{[]int{0, 1}},
			{[]int{2, 4}},
			{[]int{2}},
			{[]int{2, 5}},
			{[]int{5}},
			{[]int{0, 1}},
			{[]int{2}},
			{[]int{2, 5}},
			{[]int{5}},
			{[]int{5, 6}},
			{[]int{0, 1}},
			{[]int{1, 7}},
			{[]int{1}},
			{[]int{0, 1}},
		},
	})
}
