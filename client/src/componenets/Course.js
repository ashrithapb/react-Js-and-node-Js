import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddCourseModal } from './AddCourseModal.js';
import { AddTestModal } from './AddTestModal.js';
import { EditCourseModal } from './EditCourseModal';
import { EditTestModal } from './EditTestModal';
import TextField from '@material-ui/core/TextField';
import { CourseContext } from './UserContext';
import axios from 'axios';

function Course() {
	const { courses, setCourse } = useContext(CourseContext);
	const [tests, setTest] = useState([]);
	const [addCourseModalShow, setAddCourseModalShow] = useState(false);
	const [editCourseModalShow, setEditCourseModalShow] = useState(false);
	const [addTestModalShow, setAddTestModalShow] = useState(false);
	const [editTestModalShow, setEditTestModalShow] = useState(false);
	const [query, setQuery] = useState();
	const [queryname, setQueryname] = useState('');
	const [querytestname, setQuerytestname] = useState('');
	const [courseid, setCourseid] = useState();
	const [coursename, setCoursename] = useState('');
	const [coursedomain, setCoursedomain] = useState('');
	const [coursedescription, setCoursedescription] = useState('');
	const [testId, setTestId] = useState();
	const [testCourseId, setTestCourseId] = useState();
	const [numOfQuestions, setNumOfQuestions] = useState();
	const [testName, setTestName] = useState('');
	const [duration, setTestDuration] = useState('');
	const [access, setAccess] = useState(true);
	useEffect(() => {
		initialFetch();
	}, [access]);
	const initialFetch = () => {
		axios
			.get('/fetch-course')
			.then((res) => {
				setCourse(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		assignStatus();
		axios
			.get('/fetch-test')
			.then((res) => {
				setTest(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		setAccess(false);
	};
	const assignStatus = () => {
		setCourse(
			courses.map((data) => {
				return {
					status: false,
					id: data.id,
					name: data.name,
					domain: data.domain,
					description: data.description,
				};
			})
		);
	};
	const refreshList = () => {
		initialFetch();
	};
	const searchById = () => {
		if (query === null || query === undefined || query === '') {
			initialFetch();
		} else {
			axios
				.get('/fetch-coursebyid/' + query)
				.then((res) => {
					setCourse(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
			assignStatus();
		}
	};
	const searchByName = () => {
		if (queryname === null || queryname === undefined || queryname === '') {
			initialFetch();
		} else {
			axios
				.get('/fetch-coursebyname/' + queryname)
				.then((res) => {
					setCourse(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
			assignStatus();
		}
	};
	const searchByTestName = () => {
		if (querytestname === null || querytestname === undefined || querytestname === '') {
			initialFetch();
		} else {
			axios
				.get('/fetch-testbyname/' + querytestname)
				.then((res) => {
					setTest(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
			assignStatus();
		}
	};
	const deleteCourse = (courseid) => {
		if (window.confirm('Are you sure that you want to delete?')) {
			fetch('/delete-course/' + courseid, {
				method: 'DELETE',
				header: {
					Accept: 'application/json',
					'content-Type': 'application/json',
				},
			});
			setAccess(true);
		}
	};
	const deleteTest = (testId) => {
		if (window.confirm('Are you sure that you want to delete?')) {
			fetch('/delete-test/' + testId, {
				method: 'DELETE',
				header: {
					Accept: 'application/json',
					'content-Type': 'application/json',
				},
			});
			setAccess(true);
		}
	};
	const onClickHandler = (e) => {
		const hiddenElement = e.currentTarget.nextSibling;
		hiddenElement.className.indexOf('collapse show') > -1
			? hiddenElement.classList.remove('show')
			: hiddenElement.classList.add('show');
	};
	let addCourseModalClose = () => {
		setAddCourseModalShow(false);
		setAccess(true);
	};
	let editCourseModalClose = () => {
		setEditCourseModalShow(false);
		setAccess(true);
	};
	let addTestModalClose = () => {
		setAddTestModalShow(false);
		setAccess(true);
	};
	let editTestModalClose = () => {
		setEditTestModalShow(false);
		setAccess(true);
	};
	return (
		<div>
			<div className="search-bar">
				<TextField
					className="mr-2"
					type="number"
					hinttext="Course id"
					floatinglaveltext="Course id"
					placeholder="Course id"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className="search-bar-btn" id="search-btn" onClick={() => searchById()}>
					Search by id
				</button>
				<TextField
					className="mr-2"
					type="text"
					hinttext="Course name"
					floatinglaveltext="Course name"
					placeholder="Course name"
					value={queryname}
					onChange={(e) => setQueryname(e.target.value)}
				/>
				<button className="search-bar-btn" id="search-btn" onClick={() => searchByName()}>
					Search by Course name
				</button>
				<button className="search-bar-btn" id="search-btn" onClick={() => refreshList()}>
					View all
				</button>
			</div>
			<div>
				<Table className="mt-4" striped bordered hover size="sm">
					<thead>
						<tr>
							<th>
								<input
									type="checkbox"
									onChange={(e) => {
										let checked = e.target.checked;
										setCourse(
											courses.map((d) => {
												d.status = checked;
												return d;
											})
										);
									}}
								/>
							</th>
							<th>Course ID</th>
							<th>Course Name</th>
							<th>Course domain</th>
							<th>Course description</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<React.Fragment>
								<tr key={course.id} onClick={onClickHandler}>
									<td>
										<input
											type="checkbox"
											name={course.id}
											checked={course.status}
											onChange={(event) => {
												let checked = event.target.checked;
												setCourse(
													courses.map((data) => {
														if (course.id === data.id) {
															data.status = checked;
														}
														return data;
													})
												);
											}}
										/>
									</td>
									<td>{course.id}</td>
									<td>{course.name}</td>
									<td>{course.domain}</td>
									<td>{course.description}</td>
									<td>
										<ButtonToolbar>
											<Button
												className="mr-2"
												variant="info"
												onClick={() => {
													setEditCourseModalShow(true);
													setCourseid(course.id);
													setCoursename(course.name);
													setCoursedomain(course.domain);
													setCoursedescription(course.description);
												}}
											>
												Edit
											</Button>
											<Button className="mr-2" onClick={() => deleteCourse(course.id)}>
												Delete
											</Button>
											<EditCourseModal
												show={editCourseModalShow}
												onHide={editCourseModalClose}
												courseid={courseid}
												coursename={coursename}
												coursedomain={coursedomain}
												coursedescription={coursedescription}
											></EditCourseModal>
										</ButtonToolbar>
									</td>
								</tr>
								<tr className="collapse">
									<td colSpan="6">
										<div className="search-bar">
											<p>Test details of the course: {course.name}</p>
											<TextField
												className="mr-2"
												type="text"
												hinttext="test name"
												floatinglaveltext="test name"
												placeholder="Test name"
												value={querytestname}
												onChange={(e) => setQuerytestname(e.target.value)}
											/>
											<button
												className="search-bar-btn"
												id="search-btn"
												onClick={() => searchByTestName()}
											>
												Search by Test name
											</button>
										</div>
										<table className="inner-table">
											<thead>
												<tr>
													<th>Test id</th>
													<th>Course id</th>
													<th>Number of questions</th>
													<th>Name</th>
													<th>duraion</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{tests.map((test) =>
													test.course_id === course.id ? (
														<tr key={test.testId}>
															<td>{test.id}</td>
															<td>{test.course_id}</td>
															<td>{test.num_of_questions}</td>
															<td>{test.name}</td>
															<td>{test.duration}</td>
															<td>
																<ButtonToolbar>
																	<Button
																		className="mr-2"
																		variant="info"
																		onClick={() => {
																			setEditTestModalShow(true);
																			setTestId(test.id);
																			setTestCourseId(test.course_id);
																			setNumOfQuestions(test.num_of_questions);
																			setTestName(test.name);
																			setTestDuration(test.duration);
																		}}
																	>
																		Edit
																	</Button>
																	<Button
																		className="mr-2"
																		onClick={() => deleteTest(test.id)}
																	>
																		Delete
																	</Button>
																	<EditTestModal
																		show={editTestModalShow}
																		onHide={editTestModalClose}
																		testId={testId}
																		testCourseId={testCourseId}
																		numOfQuestions={numOfQuestions}
																		testName={testName}
																		duration={duration}
																	></EditTestModal>
																</ButtonToolbar>
															</td>
														</tr>
													) : (
														<span></span>
													)
												)}
											</tbody>
										</table>
									</td>
								</tr>
							</React.Fragment>
						))}
					</tbody>
				</Table>
				<ButtonToolbar>
					<Button className="mr-2" variant="primary" onClick={() => setAddCourseModalShow(true)}>
						Add Course
					</Button>
					<Button className="mr-2" variant="primary" onClick={() => setAddTestModalShow(true)}>
						Add Test to a course
					</Button>

					<AddCourseModal show={addCourseModalShow} onHide={addCourseModalClose} />
					<AddTestModal show={addTestModalShow} onHide={addTestModalClose} />
				</ButtonToolbar>
			</div>
		</div>
	);
}

export default Course;
