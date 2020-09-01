import React, { useState } from 'react';
import Course from './componenets/Course';
import Navigation from './componenets/Navigation';
import UserDashboard from './componenets/UserDashboard';
import { CourseContext } from './componenets/UserContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
	const [courses, setCourse] = useState([]);

	return (
		<BrowserRouter>
			<div className="container">
				<h3 className="m-3 d-flex justify-content-center">React JS crud operations</h3>
				<Navigation />
				<CourseContext.Provider value={{ courses, setCourse }}>
					<Switch>
						<Route path="/" component={Course} exact></Route>
						<Route path="/userDashboard" component={UserDashboard}></Route>
					</Switch>
				</CourseContext.Provider>
			</div>
		</BrowserRouter>
	);
}

export default App;
