/* eslint-disable @next/next/no-img-element */
interface datasOfBtn {
  nameofBtn: string;
  origin: string;
}
const AuthBtn = (datas: datasOfBtn) => {
  return (
    <div className="GFAuthBtn">
      <img
        alt={`${datas.nameofBtn}_AuthImage`}
        src={`/Icones/${datas.nameofBtn}.svg`}
      />
      <span>{datas.nameofBtn}</span>
    </div>
  );
};

export default AuthBtn;
