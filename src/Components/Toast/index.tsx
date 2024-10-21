import { useEffect } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

//Atoms and Recoil
import { MsgServerState } from '@/state/SignInUpDatas';
import { useRecoilState } from 'recoil';

//style and Constatnts
import styles from '@/styles/Components/Toast.module.css';
import { MessageServerType } from '@/Constants/Type';

const ToastComponent = () => {
  const [MessageServerState, setMessageServerState] =
    useRecoilState(MsgServerState);

  useEffect(() => {
    // manager Time To show Toast
    if (!MessageServerState.hidden) {
      setTimeout(() => {
        console.log('Hidden Toast');
        setMessageServerState((lastValue) => ({
          ...lastValue,
          hidden: true,
        }));
      }, 6000);
    }
  }, [MessageServerState]);

  return (
    <>
      {!MessageServerState.hidden && (
        <div className={styles.Container}>
          <div
            className={
              MessageServerState.messageType == MessageServerType.SUCCESS
                ? `${styles.Toast} ${styles.SuccessMessage}`
                : `${styles.Toast} ${styles.FailedMessage}`
            }
          >
            <InformationCircleIcon color="#ebf1ff" width={25} height={25} />
            <span className={styles.Message}>{MessageServerState.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastComponent;
