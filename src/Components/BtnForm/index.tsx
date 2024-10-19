interface datasBtn {
  label: string;
  Origin: string;
}

const ButtonForm = (datas: datasBtn) => {
  return (
    <button className="sendDatasBtn" onClick={() => {}}>
      {datas.label}
    </button>
  );
};
export default ButtonForm;
