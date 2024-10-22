interface datasBtn {
  label: string;
  OnPressAction: () => void;
  disabled: boolean;
  loading: boolean;
}

const ButtonForm = (datas: datasBtn) => {
  return (
    <div className="ContainerBtnLoader">
      <button
        className={
          datas.disabled || datas.loading
            ? 'sendDatasBtn disbledBtn'
            : 'sendDatasBtn'
        }
        onClick={datas.OnPressAction}
        disabled={datas.disabled || datas.loading}
      >
        {datas.label}
      </button>
      <>{datas.loading && <div className="sendDatasLoading"></div>}</>
    </div>
  );
};
export default ButtonForm;
