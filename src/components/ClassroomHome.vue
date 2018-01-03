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
		getClassroom: function() {
			let classId = this.$route.params.id;
			this.$store.dispatch('getClassroom', {
				id: classId,
			});
		},
		search() {
			/*this.$store
				.dispatch('createStudent', {
					StudentName: this.studentName,
					StudentEmailAddress: this.studentName,
				})
				.then(() => {
					// clear the form
					this.classroomName = '';
				});*/
		},
	},
};
</script>

