/*
 * @Descripttion:换肤js入口文件
 * @version: 1.0
 * @Author: ljx
 * @Date: 2020-10-21 09:49:31
 * @LastEditors: ljx
 * @LastEditTime: 2021-01-26 11:20:17
 */

import { theme as dark } from './ui-dark';
import { theme as light } from './ui-light';
import setting from '../defaultSettings';

export const theme = setting.theme === 'light' ? light : dark;
