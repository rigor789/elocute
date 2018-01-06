<template>
	<v-container grid-list-md text-xs-center>
		<v-layout column>
			<v-flex>
				<h3>Add a Student to {{classroom.ClassName}}</h3>
				<p>This student is a currently registered member of Elocute. You can search for his or her email address, and if his or her record exists, it will be added to your classroom.</p>
			</v-flex>
			<v-flex xs12>
				<v-card tile color="tile" class="pa-4">
					<v-form v-model="valid" ref="form" lazy-validation>
						<v-text-field
								label="Student Email"
								v-model="studentEmail"
								:rules="studentEmailRules"
								required
						></v-text-field>
						<v-btn class="info"
							   @click="search"
							   :disabled="!valid"
						>
							Search for a Student
						</v-btn>
					</v-form>
				</v-card>
				
				<v-card v-if="student.DisplayName" tile class="pa-4">
					<h3>{{student.DisplayName}}</h3>
					<v-btn class="info"
						@click="add"
					>
					Add to Class
					</v-btn>
										
				</v-card>
				<h3 class="pa-4">Enrolled Students</h3>

				<v-card color="tile">
					<v-layout row wrap color="tile" class="pa-4">
						<v-flex xs4
								v-for="item in students"
								:key="item.id"
						>
							<v-card flat tile>

								<h3>
									{{item.StudentName}}
									
								</h3>

							</v-card>
						</v-flex>
					</v-layout>
				</v-card>

				<h3 class="pa-4">Add an Assignment</h3>

				<v-card tile color="tile" class="pa-4">
					<v-form v-model="valid" ref="form" lazy-validation>
						<v-text-field
								label="Assignment Title"
								v-model="assignmentTitle"
								:rules="assignmentTitleRules"
								required
						></v-text-field>
						<v-text-field
								label="Text"
								v-model="assignmentText"
								:rules="assignmentTextRules"
								multi-line
								required
						></v-text-field>
						<v-btn class="info"
							   @click="create"
							   :disabled="!valid"
						>
							Create Assignment
						</v-btn>
					</v-form>
				</v-card>

				<h3 class="pa-4">Assignments</h3>

				<v-card color="tile">
					<v-layout row wrap color="tile" class="pa-4">
						<v-flex xs4
								v-for="item in assignments"
								:key="item.id"
						>
							<v-card flat tile>

								<h3>
									<router-link :to="{
										name: 'AssignmentHome',
										params: { id: item.id }
							 			}">
										 {{item.Title}}	
									</router-link>
								</h3>
								
							</v-card>
						</v-flex>
					</v-layout>
				</v-card>

			</v-flex>
		</v-layout>		
	</v-container>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters({
			user: 'getUser',
			classrooms: 'getClassrooms',
			classroom: 'getClassroom',
			student: 'getStudent',
			students: 'getStudents',
			assignments: 'getAssignments',
		}),
	},
	data: () => ({
		valid: true,
		item: {},
		studentEmail: '',
		studentEmailRules: [v => !!v || 'Student email address is required'],
		assignmentTitle: '',
		assignmentTitleRules: [v => !!v || 'Assignment Title is required'],
		assignmentText: '',
		assignmentTextRules: [v => !!v || 'Assignment Text is required'],
	}),
	created() {
		this.getClassrooms();
		this.getClassroom();
		this.getStudents();
		this.getAssignments();
	},
	methods: {
		getClassrooms: function() {
			this.$store.dispatch('getClassrooms').then(() => {
				this.getClassroom();
			});
		},
		getClassroom() {
			let classId = this.$route.params.id;
			this.$store.dispatch('getClassroom', {
				id: classId,
			});
		},
		getStudents() {
			let classId = this.$route.params.id;
			this.$store.dispatch('getStudents', {
				id: classId,
			});
		},
		getAssignments() {
			let classId = this.$route.params.id;
			this.$store.dispatch('getAssignments', {
				id: classId,
			});
		},
		search() {
			this.$store.dispatch('findUser', {
				Email: this.studentEmail,
			});
		},
		add() {
			let classId = this.classroom.id;
			let className = this.classroom.ClassName;
			let studentId = this.student.id;
			let studentName = this.student.DisplayName;
			this.$store
				.dispatch('associateClassToStudent', {
					studentId: studentId,
					classId: classId,
					className: className,
				})
				.then(() => {
					this.$store.dispatch('associateStudentToClass', {
						studentId: studentId,
						classId: classId,
						studentName: studentName,
					});
				});
		},
		create() {
			let classId = this.classroom.id;
			this.$store.dispatch('createAssignment', {
				ClassId: classId,
				Title: this.assignmentTitle,
				Text: this.assignmentText,
			});
		},
	},
};
</script>

