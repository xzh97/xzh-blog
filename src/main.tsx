import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './reset.scss';

// 初始化dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
