export default function IndexPage() {
  return (
    <div>
      <h1>我是猫页面</h1>
    </div>
  );
}

//这样是错误写法，要先写入属性，再export
IndexPage.title = "猫页面"