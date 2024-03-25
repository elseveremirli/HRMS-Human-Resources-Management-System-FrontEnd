import { Navigate, Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Dashboard from './layouts/Dashboard/Dashboard';
import Information from './layouts/Dashboard/Information';
import Footer from './layouts/Footer/Footer';
import Navigation from './layouts/Navigation/Navigation';
import Employer from './pages/Employer/Employer';
import EmployerInformation from './pages/Employer/EmployerInformation';
import EmployerLogin from './pages/Employer/EmployerLogin';
import EmployerPersonalInformation from './pages/Employer/EmployerPersonalInformation';
import EmployerProfile from './pages/Employer/EmployerProfile';
import EmployersAdvertisements from './pages/Employer/EmployersAdvertisements';
import JobList from './pages/Job/JobList';
import JobAdvertisement from './pages/JobAdvertisement/JobAdvertisement';
import JobAdvertisementDetail from './pages/JobAdvertisement/JobAdvertisementDetail';
import JobAdvertisementPost from './pages/JobAdvertisement/JobAdvertisementPost';
import JobAdvertisementSearchList from './pages/JobAdvertisement/JobAdvertisementSearchList';
import Ability from './pages/JobSeekerProps/Ability';
import City from './pages/SystemEmployee/City';
import CoverLetter from './pages/JobSeekerProps/CoverLetter';
import Education from './pages/JobSeekerProps/Education';
import EducationType from './pages/SystemEmployee/EducationType';
import ExperienceType from './pages/SystemEmployee/ExperienceType.js';
import Faculty from './pages/SystemEmployee/Faculty';
import HighSchool from './pages/JobSeekerProps/HighSchool';
import HighSchoolType from './pages/SystemEmployee/HighSchoolType';
import ImageInfo from './pages/JobSeekerProps/ImageInfo';
import InformationPage from './pages/JobSeekerProps/InformationPage';
import JobExperience from './pages/JobSeekerProps/JobExperience';
import JobSeeker from './pages/JobSeekerProps/JobSeeker';
import JobSeekerLogin from './pages/JobSeekerProps/JobSeekerLogin';
import Language from './pages/SystemEmployee/Language';
import LanguageInfo from './pages/JobSeekerProps/LanguageInfo';
import MilitaryStatu from './pages/SystemEmployee/MilitaryStatu';
import PersonalInformation from './pages/JobSeekerProps/PersonalInformation';
import PositionLevel from './pages/SystemEmployee/PositionLevel';
import Profile from './pages/JobSeekerProps/Profile';
import ProgramInfo from './pages/SystemEmployee/ProgramInfo';
import Resume from './pages/JobSeekerProps/Resume';
import SocialMedia from './pages/JobSeekerProps/SocialMedia';
import TypeOfWork from './pages/SystemEmployee/TypeOfWork';
import University from './pages/SystemEmployee/University';
import SectorList from './pages/SystemEmployee/SectorList';
import SystemEmployeeSignUp from './pages/SystemEmployee/SystemEmployeeSignUp';
import PasswordOperations from './pages/Employer/PasswordOperations';
import SystemEmployeeInfo from './pages/SystemEmployee/SystemEmployeeInfo';
import NotFoundPage from './pages/NotFoundPage';
import FavoriteJobAdvertisements from './pages/JobSeekerProps/FavoriteJobAdvertisements';
import JobApplication from './pages/JobSeekerProps/JobApplication';
import SeeApplicant from './pages/Employer/SeeApplicant';

function App() {


  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Information />} />
        <Route path="/home" element={<Information />} />
        <Route path="/jobAdvertisement" element={<JobAdvertisement />} />
        <Route path='/advertisement/:id' element={<JobAdvertisementDetail />} />
        <Route path="/jobAdvertisementSearchList" element={<JobAdvertisementSearchList />} />
        <Route path='/advertisement/:id' />
        <Route path="/advertisementPost" element={<JobAdvertisementPost />} />
        <Route path='/sectorList' element={<SectorList />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/jobList' element={<JobList />} />
        <Route path='/languageList' element={<Language />} />
        <Route path='/faculty' element={<Faculty />} />
        <Route path='/positionLevel' element={<PositionLevel />} />
        <Route path='/programInfo' element={<ProgramInfo />} />
        <Route path='/militaryStatuInfo' element={<MilitaryStatu />} />
        <Route path='/universityList' element={<University />} />
        <Route path='/typeOfWork' element={<TypeOfWork />} />
        <Route path='/highSchoolTypeList' element={<HighSchoolType />} />
        <Route path='/cityList' element={<City />} />
        <Route path='/jobSeekerSignUp' element={<JobSeeker />} />
        <Route path='/employer' element={<Employer />} />
        <Route path='/ability' element={<Ability />} />
        <Route path='/coverLetter' element={<CoverLetter />} />
        <Route path='/educationType' element={<EducationType />} />
        <Route path='/experience' element={<ExperienceType />} />
        <Route path='/socialMedia' element={<SocialMedia />} />
        <Route path='/systemEmployeeSignUp' element={<SystemEmployeeSignUp />} />
        <Route path='/languageInfo' element={<LanguageInfo />} />
        <Route path='/jobExperience' element={<JobExperience />} />
        <Route path='/education' element={<Education />} />
        <Route path='/highSchool' element={<HighSchool />} />
        <Route path='/image' element={<ImageInfo />} />
        <Route path='/jobSeekerLogin' element={<JobSeekerLogin />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/employerLogin' element={<EmployerLogin />} />
        <Route path='/profile/:id/resume' element={<Resume />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/informationPage' element={<InformationPage />} />
        <Route path='/personalInformation' element={<PersonalInformation />} />
        <Route path='/employerProfile' element={<EmployerProfile />} />
        <Route path='/employerProfile/:id' element={<EmployerProfile />} />
        <Route path='/employerInformation' element={<EmployerInformation />} />
        <Route path='/employerPersonalInformation' element={<EmployerPersonalInformation />} />
        <Route path='/employersAdvertisements' element={<EmployersAdvertisements />} />
        <Route path='/passwordChangeOperation' element={<PasswordOperations />} />
        <Route path='/systemEmployeeInfo' element={<SystemEmployeeInfo />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path='/favoriteJobAdvertisements' element={<FavoriteJobAdvertisements />} />
        <Route path='/yourJobApplications' element={<JobApplication />} />
        <Route path='/seeApplicants' element={<SeeApplicant />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;