//表示为单元测试，不编译进release版本
#[cfg(test)]
mod tests {
    #[test]
    fn exploration1() {
    	//测试相等
        assert_eq!(2 + 2, 4);     
    }

    #[test]
    fn exploration2() {
    	//测试相等，加入提示
        assert_eq!(2 + 1, 4,"should be equal");
    }

     #[test]
    fn exploration3() {
     	//测试总是为true
        assert!(true == false ,"should be true")
    }

    #[test]
    fn another(){
    	//抛出panic来制造失败
    	panic!("Make this test fail")
    }

    #[test]
    #[should_panic(expected = "Guess value must be less than or equal to 100")]
    fn another2(){
    	//必须抛出panic才能测试成功
    }
}
