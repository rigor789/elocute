<template> 
	<v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-flex xs1 offset-xs11>
        <v-btn color="info" @click="logOut">Logout</v-btn>
      </v-flex>
      <v-flex xs12>        
				<v-card tile color="tile" class="pa-4">
					<h1 text-xs-center>Welcome {{name}}</h1>
					<h4 text-xs-center>Account Details</h4>            
					<p>Name: {{name}}</p> 
					<p>Email: {{email}}</p> 
					<p>Teacher Id: {{userId}}</p>
					<v-form v-model="valid" ref="form" lazy-validation>
						<v-text-field
						label="Classroom Name"
						v-model="classroomName"
						:rules="classroomNameRules"
						:counter="20"
						required
						></v-text-field>
						<v-btn
						@click="submit"
						:disabled="!valid"
						>
						create a classroom
						</v-btn>
					</v-form>
				</v-card>
				<v-card tile color="tile" class="pa-4">
					<h3>My Classrooms</h3>
					<v-btn color="info">Add a student</v-btn>
					
				</v-card>				
      </v-flex>      
    </v-layout>
  </v-container>	
</template>

<script>
import firebase from 'firebase';
import { db } from '../utils/firebase';

export default {
	data: () => ({
		valid: true,
		userId: '',
		name: '',
		email: '',
		user: {},
		myClassrooms: {},
		classroomName: '',
		classroomNameRules: [
			v => !!v || 'Classroom name is required',
			v => v.length <= 20 || 'Name must be fewer than 20 characters',
		],
	}),
	firebase: {
		classrooms: {
			source: db.ref('Classrooms'),
		},
	},
	created() {
		this.user = firebase.auth().currentUser;
		if (this.user) {
			this.name = this.user.displayName;
			this.email = this.user.email;
			this.userId = this.user.uid;
		}
	},
	methods: {
		logOut() {
			firebase.auth().signOut();
		},
		submit() {
			let classroom = db.ref('Classrooms/' + this.userId);
			if (this.$refs.form.validate()) {
				classroom.push({
					ClassName: this.classroomName,
				});
			}
		},
	},
};
</script>