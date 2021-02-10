package annotation_test;

import java.util.Arrays;

@MyAnnotation(Name="123",Import={MyUse.class,App.class})
class MyUse{

}

public class App 
{
    public static void main( String[] args ) {
        MyAnnotation annotation = MyUse.class.getAnnotation(MyAnnotation.class);
        System.out.println(Arrays.toString(annotation.Import()));
        System.out.println(annotation.Name());
    }
}
