import React from 'react'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <h2>信息页面</h2>
  },
  {
    path: "/password",
    main: () => <h2>修改密码</h2>
  },
  {
    path: "/billing",
    main: () => <h2>配额管理</h2>
  }
];

function Profile() {
  return (
    <Router basename="/profile">
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "40%",
            background: "#f0f0f0"
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">用户信息</Link>
            </li>
            <li>
              <Link to="/password">密码管理</Link>
            </li>
            <li>
              <Link to="/billing">配额管理</Link>
            </li>
          </ul>


        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </Router>
  );
}


export default Profile;
