import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, PermissionsAndroid, Platform, ToastAndroid, Button } from 'react-native';
import { Pdf } from 'react-native-pdf-lib';
import { Avatar } from 'react-native-paper';

const CVPreview = ({ route }) => {
  const { personalInfo, experiences, educations, skills, references, imageUri, avatarUri } = route.params;

  const generatePDF = async () => {
    try {
      // Check for permissions (Android only)
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to save the CV PDF',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          ToastAndroid.show('Storage permission denied', ToastAndroid.SHORT);
          return;
        }
      }

      // Create PDF document
      const pdfPath = await Pdf.create()
        .addPage()
        .setText(`Name: ${personalInfo.name}`)
        .setText(`Address: ${personalInfo.address}`)
        .setText(`Date of Birth: ${personalInfo.dateOfBirth}`)
        .setText(`Gender: ${personalInfo.gender}`)
        .setText(`Civil Status: ${personalInfo.civilStatus}`)
        .setText(`Phone Number: ${personalInfo.phoneNumber}`)
        .setText(`ID Number: ${personalInfo.idNumber}`)
        .setText(`About: ${personalInfo.about}`)
        .addPage()
        .setText('Experience:')
        .addText(experiences.map(exp => `Company: ${exp.company}, Role: ${exp.role}`).join('\n'))
        .addPage()
        .setText('Education:')
        .addText(educations.map(edu => `School: ${edu.school}, Year: ${edu.year}, Description: ${edu.description}`).join('\n'))
        .addPage()
        .setText('Skills:')
        .addText(skills.map(skill => `Skill: ${skill.skill}, Proficiency: ${skill.proficiency}`).join('\n'))
        .addPage()
        .setText('References:')
        .addText(references.map(ref => `Name: ${ref.name}, Address: ${ref.address}, Phone Number: ${ref.phoneNumber}`).join('\n'))
        .save();

      ToastAndroid.show(`PDF saved to ${pdfPath}`, ToastAndroid.SHORT);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      ToastAndroid.show('Failed to generate PDF', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.profileImage} />}
      <Avatar.Image size={100} source={require('../../assets/avetar.png')}  style={styles.avatarImage}/>

      <View style={styles.headerSection}>
        <Text style={styles.name}>{personalInfo.name}</Text>
        <Text style={styles.contactInfo}>{personalInfo.address}</Text>
        <Text style={styles.contactInfo}>{personalInfo.phoneNumber}</Text>
        {personalInfo.email && <Text style={styles.contactInfo}>{personalInfo.email}</Text>}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Text style={styles.sectionItem}><Text style={styles.boldText}>Date of Birth:</Text> {personalInfo.dateOfBirth}</Text>
        <Text style={styles.sectionItem}><Text style={styles.boldText}>Gender:</Text> {personalInfo.gender}</Text>
        <Text style={styles.sectionItem}><Text style={styles.boldText}>Civil Status:</Text> {personalInfo.civilStatus}</Text>
        <Text style={styles.sectionItem}><Text style={styles.boldText}>ID Number:</Text> {personalInfo.idNumber}</Text>
        <Text style={styles.sectionItem}><Text style={styles.boldText}>About:</Text> {personalInfo.about}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {experiences.map((exp, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Company: {exp.company}</Text>
            <Text style={styles.itemDescription}>Role: {exp.role}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Education</Text>
        {educations.map((edu, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>School: {edu.school}</Text>
            <Text style={styles.itemDescription}>Year: {edu.year}</Text>
            <Text style={styles.itemDescription}>Description: {edu.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Skills</Text>
        {skills.map((skill, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Skill: {skill.skill}</Text>
            <Text style={styles.itemDescription}>Proficiency: {skill.proficiency}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>References</Text>
        {references.map((ref, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Name: {ref.name}</Text>
            <Text style={styles.itemDescription}>Address: {ref.address}</Text>
            <Text style={styles.itemDescription}>Phone Number: {ref.phoneNumber}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Generate PDF" onPress={generatePDF} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 20,
   
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 16,
    marginVertical: 2,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: 'purple',
    color: 'white',
    textAlign: 'center'
  },
  sectionItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  itemContainer: {
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    marginVertical: 2,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default CVPreview;
