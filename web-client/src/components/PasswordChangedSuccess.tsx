import { principalColor } from "../config/colors";

const PasswordChangedSuccess = () => {
  return (
    <div
      style={{
        backgroundColor: principalColor,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          color: 'white',
          backgroundColor: 'black',
          lineHeight: '100px',
          fontSize: 60,
          fontWeight: 'bold',
          width: '100%',
          textAlign: 'center',
        }}
      >
        Password changed successfuly. Open the app and login.
      </div>
    </div>
  );
};

export default PasswordChangedSuccess;