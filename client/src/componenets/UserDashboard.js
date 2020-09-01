import React, { useContext } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CourseContext } from './UserContext';

function UserDashboard() {
	const { courses } = useContext(CourseContext);
	const jsPdfGenerator = () => {
		console.log('home ' + courses);
		let doc = new jsPDF('p', 'pt');
		doc.text(20, 20, 'Course - status');
		doc.autoTable({
			body: courses,
			columns: [
				{ header: 'id', dataKey: 'id' },
				{ header: 'name', dataKey: 'name' },
				{ header: 'domain', dataKey: 'domain' },
				{ header: 'description', dataKey: 'description' },
				{ header: 'status', dataKey: 'status' },
			],
		});
		doc.save('generated.pdf');
	};
	return (
		<div class="user-dashboard">
			<button onClick={() => jsPdfGenerator()}>Download Document</button>
		</div>
	);
}
export default UserDashboard;
