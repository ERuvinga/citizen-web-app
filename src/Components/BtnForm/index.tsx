interface datasBtn {
  label: string;
  OnPressAction: () => void;
  disabled: boolean;
}

const ButtonForm = (datas: datasBtn) => {
  return (
    <button
      className={datas.disabled ? 'sendDatasBtn disbledBtn' : 'sendDatasBtn'}
      onClick={datas.OnPressAction}
      disabled={datas.disabled}
    >
      {datas.label}
    </button>
  );
};
export default ButtonForm;
