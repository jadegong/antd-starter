/**
 * v1.5.0 2021/04/25 gqd 修改danger的按钮样式，防止影响link类型的danger按钮;
 */
import styled from 'styled-components';
import {Button} from '../index';

export const BasicButton = styled(Button)`
    &.ant-btn {
        color: ${(props) => props.theme['dark-white']};
        border-color: ${(props) => {
                return props.theme['dark-gray1'];
            }};
        background: transparent;
    }
    &.ant-btn-primary {
        background-color: ${(props) => props.theme['dark-blue11']};
        border-color: ${(props) => props.theme['dark-blue11']};
        &.ant-btn-dangerous {
            background-color: ${(props) => props.theme['dark-red1']};
            border-color: ${(props) => props.theme['dark-red1']};
        }
    }
`;
