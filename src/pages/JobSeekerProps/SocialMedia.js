import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import SocialMediaService from '../../services/socialMediaService';
import * as Yup from "yup";
import { Formik, useFormik } from 'formik';
import { UserContext } from '../../contexts/UserProvider';

function SocialMedia() {

    const [socialMedias, setSocialMedias] = useState([])
    const [open, setOpen] = useState([])
    const { user } = useContext(UserContext)
    const [jobSeeker, setJobSeeker] = useState([])

    let socialMediaService = new SocialMediaService();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = socialMediaService.getByJobSeekerId(user?.data?.id).then((result) => setSocialMedias(result.data.data));
                setJobSeeker(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const userId = user?.data?.id;

        if (userId) {
            fetchUser();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.data?.id]);

    const initialValues = {
        linkedinAccount: '',
        githubAccount: '',
        twitterAccount: '',
        jobSeekerId: (user?.data?.id),
    }

    const validationSchema = Yup.object({
        linkedinAccount: Yup.string().required("required field"),
        githubAccount: Yup.string().required("required field"),
        twitterAccount: Yup.string().required("required field"),
    })

    function refreshPage() {
        window.location.reload();
    }

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        socialMediaService.addSocialMedia(values);
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
    };

    const handleDelete = async (id) => {
        console.log(id);
        socialMediaService.deleteSocialMedia(id);
        refreshPage();
    }

    const handleModal = (value) => {
        setOpen(value);
    };

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });


    return (
        <Container>
            <Segment>
                <Header as='h3' disabled dividing>
                    <Icon name='universal access' />
                    <Header.Content>Social Media</Header.Content>
                </Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Formik>
                                <Form dividing onSubmit={formik.handleSubmit}>
                                    <Form.Input
                                        icon="linkedin"
                                        label='Linkedin'
                                        name='linkedinAccount'
                                        placeholder='please enter your Linkedin account..'
                                        onChange={(event, data) => handleChange("linkedinAccount", data.value)}
                                        value={formik.values.linkedinAccount}
                                    />
                                    {formik.errors.linkedinAccount && formik.touched.linkedinAccount && <span><Label basic pointing color="red" content={formik.errors.linkedinAccount} /><br /></span>}
                                    <Form.Input
                                        icon="github"
                                        label='Github Account'
                                        name='githubAccount'
                                        placeholder='please enter your Github Account..'
                                        onChange={(event, data) => handleChange("githubAccount", data.value)}
                                        value={formik.values.githubAccount}
                                    />
                                    {formik.errors.githubAccount && formik.touched.githubAccount && <span><Label basic pointing color="red" content={formik.errors.githubAccount} /><br /></span>}
                                    <Form.Input
                                        icon="twitter"
                                        label='Twitter'
                                        name='twitterAccount'
                                        placeholder='please enter your Twitter Account..'
                                        onChange={(event, data) => handleChange("twitterAccount", data.value)}
                                        value={formik.values.twitterAccount}
                                    />
                                    {formik.errors.twitterAccount && formik.touched.twitterAccount && <span><Label basic pointing color="red" content={formik.errors.twitterAccount} /><br /></span>}
                                    <Button animated='fade' inverted color='red' type='submit'>
                                        <Button.Content visible>Add</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='thumbtack' />
                                        </Button.Content>
                                    </Button>
                                </Form>
                            </Formik>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Table striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='5'>Your Social Media Accounts</Table.HeaderCell>
                                        <Table.HeaderCell colSpan='3'>Linkedin</Table.HeaderCell>
                                        <Table.HeaderCell>Github</Table.HeaderCell>
                                        <Table.HeaderCell>Twitter</Table.HeaderCell>
                                        <Table.HeaderCell colSpan='2'></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {/* <Table.Body>
                                    {socialMedias.map((socialMedia) =>
                                        <Table.Row key={socialMedia.socialMediaId}>
                                            <Table.Cell>{socialMedia.linkedinAccount}</Table.Cell>
                                            <Table.Cell>{socialMedia.githubAccount}</Table.Cell>
                                            <Table.Cell>{socialMedia.twitterAccount}</Table.Cell>
                                            <Table.Cell textAlign='right'>
                                                <Button icon inverted color="red">
                                                    <Icon name='pencil' />
                                                </Button>
                                                <Button icon inverted color="red"
                                                    onClick={() => handleDelete(socialMedia.socialMediaId)}>
                                                    <Icon name='cancel' />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body> */}
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    )
}
export default SocialMedia;
