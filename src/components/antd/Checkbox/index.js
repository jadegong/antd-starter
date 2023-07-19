import styled from 'styled-components';
import { Checkbox } from '../index';

const BasicCheckbox = styled(Checkbox)`
  .ant-checkbox-wrapper {
    color: ${(props) => props.theme['dark-white']};
  }
`;

BasicCheckbox.Group = Checkbox.Group;

export { BasicCheckbox };
