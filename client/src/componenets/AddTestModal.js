import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

export class AddTestModal extends Component {
	constructor(props) {
		super(props);
		this.state = { courses: [], snackbaropen: false, snackbarmsg: '' };
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		this.getCourse();
	}
	componentDidUpdate() {
		this.getCourse();
	}
	getCourse() {
		axios
			.get('/fetch-course')
			.then((res) => {
				this.setState({ courses: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}
	snackbarClose = (event) => {
		this.setState({ snackbaropen: false });
	};
	handleSubmit(event) {
		event.preventDefault();
		fetch('/insert-test', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: null,
				course_id: event.target.testCourseId.value,
				num_of_questions: event.target.numOfQuestions.value,
				name: event.target.testName.value,
				duration: event.target.duration.value,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({ snackbaropen: true, snackbarmsg: result.insert });
				},
				(error) => {
					this.setState({ snackbaropen: true, snackbarmsg: 'Failed to add' });
				}
			);
	}

	render() {
		return (
			<div className="container">
				<Snackbar
					anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
					open={this.state.snackbaropen}
					autoHideDuration={400}
					onClose={this.snackbarClose}
					message={<span id="message-id">{this.state.snackbarmsg}</span>}
					action={[
						<IconButton key="close" arial-label="Close" color="inherit" onClick={this.snackbarClose}>
							X
						</IconButton>,
					]}
				/>
				<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Add a new Test to the course</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="testCourseId">
										<Form.Label>Course id</Form.Label>
										<Form.Control as="select">
											{this.state.courses.map((course) => (
												<option key={course.id}>{course.id}</option>
											))}
										</Form.Control>
									</Form.Group>
									<Form.Group controlId="numOfQuestions">
										<Form.Label>Number of questions</Form.Label>
										<Form.Control
											type="number"
											pattern="[0-9]*"
											name="numOfQuestions"
											required
											placeholder="Number of questions"
										/>
									</Form.Group>
									<Form.Group controlId="testName">
										<Form.Label>Test Name</Form.Label>
										<Form.Control type="text" name="testName" required placeholder="Name" />
									</Form.Group>
									<Form.Group controlId="duration">
										<Form.Label>Test Duration</Form.Label>
										<Form.Control type="text" name="duration" required placeholder="Duration" />
									</Form.Group>
									<Form.Group>
										<Button variant="primary" type="submit">
											Add
										</Button>
									</Form.Group>
								</Form>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={this.props.onHide}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
