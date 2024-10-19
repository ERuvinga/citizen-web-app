interface datasOfLine {
  TextLine: string;
}
const LineComponent = (datas: datasOfLine) => {
  return (
    <div className="ContainerLine">
      <div className="line"></div>
      <span className="TextEnterLine">{datas.TextLine}</span>
      <div className="line"></div>
    </div>
  );
};
export default LineComponent;
