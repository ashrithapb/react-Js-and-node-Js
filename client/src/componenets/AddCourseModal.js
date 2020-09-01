import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddCourseModal extends Component {
	constructor(props) {
		super(props);
		this.state = { snackbaropen: false, snackbarmsg: '' };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	snackbarClose = (event) => {
		this.setState({ snackbaropen: false });
	};

	handleSubmit(event) {
		event.preventDefault();
		fetch('/insert-course', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: null,
				name: event.target.courseName.value,
				domain: event.target.courseDomain.value,
				description: event.target.courseDescription.value,
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
						<Modal.Title id="contained-modal-title-vcenter">Add a new Course</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="courseName">
										<Form.Label>Course name</Form.Label>
										<Form.Control type="text" name="courseName" required placeholder="Name" />
									</Form.Group>
									<Form.Group controlId="courseDomain">
										<Form.Label>Course domain</Form.Label>
										<Form.Control type="text" name="courseDomain" required placeholder="Domain" />
									</Form.Group>
									<Form.Group controlId="courseDescription">
										<Form.Label>Course Description</Form.Label>
										<Form.Control
											type="text"
											name="courseDescription"
											required
											placeholder="Description"
										/>
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
