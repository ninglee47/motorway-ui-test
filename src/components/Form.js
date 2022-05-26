import React, {useState} from 'react';
import { Field, Form, Formik } from 'formik';
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'

function ClientForm() {
    const [sliderValue, setSliderValue] = useState(500);
    function validateName(value) {
      let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
      let error
      if (!value) {
        error = 'Name is required'
      } else if (!regName.test(value)) {
        error = "Invalid format"
      }
      return error
    }

    function validateEmail(value) {
        var email_regex = /^\S+@\S+$/
        let error
        if (!value) {
          error = 'Email is required'
        } else if (!email_regex.test(value)) {
            error = 'Invalid email address';
        }
        return error
    }

    function validateDate(value) {
        var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        let error;
        if (!value) {
          error = 'Date of birth is required';
        }else if (!date_regex.test(value)) {
            error = 'Invalid birth data format';
        } 
        return error;
    }

    function validateColor(value) {
        let error;
        var s = new Option().style;
        
        if (value) {
          s.color = value.toLowerCase();
          console.log(s.color)
          console.log(value.toLowerCase())
        }
        if (!value) {
          error = 'Favourite Color is required';
        } else if (s.color !== value.toLowerCase()){
            error = 'Invalid color';
        }
        return error;
    }
  
    return (
      <Formik
        initialValues={{ name: '', email: '', dateOfBirth: '', color: '', salary: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <Box w='100%' maxW={{base:'350px', md:'600px'}} mx={'auto'}>
          <Form>
            <Field name='name' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor='name'>First name</FormLabel>
                  <Input {...field} id='name' placeholder='name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='email' validate={validateEmail}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input {...field} id='email' placeholder='email' />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='dateOfBirth' validate={validateDate}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.dateOfBirth && form.touched.dateOfBirth}>
                  <FormLabel htmlFor='dateOfBirth'>Date of Birth</FormLabel>
                  <Input {...field} id='dateOfBirth' placeholder='DD/MM/YYYY' />
                  <FormErrorMessage>{form.errors.dateOfBirth}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='color' validate={validateColor}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.color && form.touched.color}>
                  <FormLabel htmlFor='color'>Favourite Color</FormLabel>
                  <Input {...field} type='color' id='color' placeholder='Favourite Color' />
                  <FormErrorMessage>{form.errors.color}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='salary'>
            {({ form }) => (
           
            <FormControl>
              <FormLabel htmlFor='salary' mb='35px'>Salary</FormLabel>
              <Slider aria-label='slider-ex-6' 
                onChange={(val) => {
                  form.setFieldValue("salary", val)
                  setSliderValue(val)
                }} 
                min={0}
                max={1000}
                height={'20px'}>
                <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
                  0
                </SliderMark>
                <SliderMark value={500} mt='1' ml='-2.5' fontSize='sm'>
                  500
                </SliderMark>
                <SliderMark value={1000} mt='1' ml='-2.5' fontSize='sm'>
                  1000
                </SliderMark>
                <SliderMark
                  value={sliderValue}
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  w='12'
                >
                  {sliderValue}
                </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          )}
          </Field>
        
            
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              Submit
            </Button>
          </Form>
          </Box>
        )}
      </Formik>
    )
  }

  export default ClientForm;