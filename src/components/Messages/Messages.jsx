import { message } from "antd"

const success = (mess = 'Sucess') => {
    message.success(mess);
};

const error = (mess = 'Error') => {
    message.error(mess);
};  

const warning = (mess = 'Warning') => {
    message.warning(mess);
};

export { success, error, warning }