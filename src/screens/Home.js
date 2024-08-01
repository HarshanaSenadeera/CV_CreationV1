import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';

const Home = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [civilstatus, setCivilStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const genders = ['Male', 'Female', 'Other'];
  const civil = ['Single', 'Married', 'Divorce'];
  const [about, setAbout] = useState('');

  const [experiences, setExperiences] = useState([{ company: '', role: '' }]);
  const [educations, setEducations] = useState([{ school: '', year: '', description: '' }]);
  const [skills, setSkills] = useState([{ skill: '', proficiency: '' }]);

  const [imageUri, setImageUri] = useState(null);

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { company: '', role: '' }]);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  const handleAddEducation = () => {
    setEducations([...educations, { school: '', year: '', description: '' }]);
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { skill: '', proficiency: '' }]);
  };

  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
       //@ts-ignore
      setImageUri(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>

        {/* --------------------- About section -----------------------------------*/}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          
        />
        <TextInput
          style={styles.textArea}
          placeholder="About"
          value={about}
          onChangeText={setAbout}
          multiline={true}
          numberOfLines={4}
        />

<TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            {genders.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
        

        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={civilstatus}
          style={styles.input}
          onValueChange={(itemValue) => setCivilStatus(itemValue)}
        >
          <Picker.Item label="Select Civil status" value="" />
          {civil.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
        </View>

        <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
          <Text style={styles.imageButtonText}>Select Image</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        {/* Add more personal information fields as needed */}
      </View>


 {/* ---------------------------- Experiences--------------------------------- */}
 <Text style={styles.header}>EXPERIENCES</Text>
      {experiences.map((experience, index) => (
        <View key={index} style={styles.experienceContainer}>
          <TextInput
            style={styles.input}
            placeholder="Company"
            value={experience.company}
            onChangeText={(text) => handleExperienceChange(index, 'company', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Role"
            value={experience.role}
            onChangeText={(text) => handleExperienceChange(index, 'role', text)}
          />
        </View>
      ))}
      <TouchableOpacity  onPress={handleAddExperience}>
        <Text style={styles.addButtonText}>+ Add Experience</Text>
      </TouchableOpacity>
      


 {/* ---------------------------- Education --------------------------------- */}
 <Text style={styles.header}>EDUCATION</Text>
      {educations.map((education, index) => (
        <View key={index} style={styles.experienceContainer}>
          <TextInput
            style={styles.input}
            placeholder="School/ Institute"
            value={education.school}
            onChangeText={(text) => handleEducationChange(index, 'school', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Year"
            value={education.year}
            onChangeText={(text) => handleEducationChange(index, 'year', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={education.description}
            onChangeText={(text) => handleEducationChange(index, 'description', text)}
            multiline={true}
            numberOfLines={2}
          />
        </View>
      ))}
      <TouchableOpacity  onPress={handleAddEducation}>
        <Text style={styles.addButtonText}>+ Add Education</Text>
      </TouchableOpacity>

      {/* ---------------------------- Skills --------------------------------- */}
      <Text style={styles.header}>SKILLS</Text>
      {skills.map((skill, index) => (
        <View key={index} style={styles.experienceContainer}>
          <TextInput
            style={styles.input}
            placeholder="Skill"
            value={skill.skill}
            onChangeText={(text) => handleSkillChange(index, 'skill', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Proficiency"
            value={skill.proficiency}
            onChangeText={(text) => handleSkillChange(index, 'proficiency', text)}
          />
        </View>
      ))}
      <TouchableOpacity  onPress={handleAddSkill}>
        <Text style={styles.addButtonText}>+ Add Skill</Text>
      </TouchableOpacity>



      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
        <Text style={styles.buttonText}>Save and Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#13e004',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top', // Align text at the top of the TextInput
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  experienceContainer: {
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#13e004',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  
});

export default Home;
