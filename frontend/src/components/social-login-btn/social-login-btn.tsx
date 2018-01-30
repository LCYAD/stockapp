import * as React from 'react';
const SocialLogin = require('react-social-login').default;
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

import './social-log-btn.css';

const Button = ({ children, triggerLogin, ...props }: 
    ButtonHTMLAttributes<HTMLButtonElement> & {triggerLogin: MouseEventHandler<HTMLButtonElement>}) => (
        <button className="facebook-login-button" onClick={triggerLogin} {...props}>
            {children}
        </button>
);

export default SocialLogin(Button);