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
					<v-layout row wrap color="tile">
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
		}),
	},
	data: () => ({
		valid: true,
		item: {},
		studentEmail: '',
		studentEmailRules: [v => !!v || 'Student email address is required'],
	}),
	created() {
		this.getClassroom();
	},
	methods: {
		getClassroom() {
			let classId = this.$route.params.id;
			this.$store
				.dispatch('getClassroom', {
					id: classId,
				})
				.then(() => {
					this.$store.dispatch('getStudents', {
						id: classId,
					});
				});
		},
		getStudents() {
			let classId = this.$route.params.id;
			this.$store.dispatch('getStudents', {
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
	},
};
</script>

