//https://github.com/flutter/website/tree/main/examples/animation/animate5
//看这里
//controller定义了关联多个动画，screen sync同步，以及同步启动和关闭，持续的时间。启动以后，输入当前时间，计算出当前动画的百分比。
//animation定义了数值的变化方式，描述了0和1之间的插值方式。常见有直线插值，还有曲线插值。输入当前动画的百分比，输出0和1之间的插值。
//tween，定义了实际数值的起始和结束值。输入0和1之间的插值，以及起始和结束值，输出当前值。
//组件工具
//AnimatedWidget，StatelessWidget的一个子类，自动对animation绑定listen，并且dipose
//AnimationBuilder，以声明的方式，绑定animation，并且创建一个dom包围子类，来间接控制子dom的大小或位置。