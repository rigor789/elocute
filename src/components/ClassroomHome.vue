<template>
	<v-container grid-list-md text-xs-center>
   		<v-card color="tile">
			<h3>
				Add a Student to {{classroom.ClassName}}					
			</h3>
		</v-card>		
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
		studentName: '',
		studentNameRules: [v => !!v || 'Student name is required'],
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
		submit() {
			this.$store
				.dispatch('createStudent', {
					StudentName: this.studentName,
					StudentEmailAddress: this.studentName,
				})
				.then(() => {
					// clear the form
					this.classroomName = '';
				});
		},
	},
};
</script>

