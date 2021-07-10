export default function IndexPage(props) {
  return (
    <div>
      <h1>我是列表头部</h1>
      <div>{props.children}</div>
    </div>
  );
}
