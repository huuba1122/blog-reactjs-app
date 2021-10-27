import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './scss/_input.scss';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.object
};

Input.defaultProps = {
    name: '',
    label: '',
    type: '',
    value: '',
    error: null,
    onChange: null,
}

function Input(props) {
    const [isTypePassword, setIsTypePassword] = useState(props.type === 'password');
    const changTypeInput = () => {
        setIsTypePassword(!isTypePassword);
    }
    const { name, label, onChange, type, value, error } = props;
    return (
        <div className="form-group">
            <label htmlFor="name">{label}</label>
            <input type={ isTypePassword ? 'password' : 'text' } name={name} id={name} onChange={onChange} value={value} />
            <div className="error-message">{error[name]}</div>
            {type === 'password' && 
                <span type="submit" className="password-icon" onClick={changTypeInput} >
                   {isTypePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
            }
        </div>
    );
}

export default Input;