import { Route} from "react-router";
import JobAdvertisementSearchList from './pages/JobAdvertisement/JobAdvertisementSearchList';
import JobAdvertisementDetail from './pages/JobAdvertisement/JobAdvertisementDetail';
import JobAdvertisementPost from './pages/JobAdvertisement/JobAdvertisementPost';
import SectorList from './pages/Sector/SectorList';
import Dashboard from './layouts/Dashboard/Dashboard';
import SiteMap from './layouts/Dashboard/SiteMap';
import JobList from './pages/Job/JobList';
import Language from './pages/JobSeekerProps/Language';
import Faculty from './pages/JobSeekerProps/Faculty';
import PositionLevel from './pages/JobSeekerProps/PositionLevel';
import ProgramInfo from './pages/JobSeekerProps/ProgramInfo';
import MilitaryStatu from './pages/JobSeekerProps/MilitaryStatu';
import University from './pages/JobSeekerProps/University';
import TypeOfWork from './pages/JobSeekerProps/TypeOfWork'
import HighSchoolType from './pages/JobSeekerProps/HighSchoolType'
import City from './pages/JobSeekerProps/City'
import JobSeeker from './pages/JobSeekerProps/JobSeeker'
import Employer from './pages/Employer/Employer'
import Ability from './pages/JobSeekerProps/Ability';
import CoverLetter from './pages/JobSeekerProps/CoverLetter';
import EducationType from './pages/JobSeekerProps/EducationType';
import ExperienceType from './pages/JobSeekerProps/ExperienceType.js';
import SocialMedia from './pages/JobSeekerProps/SocialMedia';
import LanguageInfo from './pages/JobSeekerProps/LanguageInfo'
import SystemEmployeeSignUp from './pages/SystemEmployee/SystemEmployeeSignUp';
import JobExperience from './pages/JobSeekerProps/JobExperience';
import Education from './pages/JobSeekerProps/Education';
import JobAdvertisement from './pages/JobAdvertisement/JobAdvertisement';
import HighSchool from './pages/JobSeekerProps/HighSchool';
import ImageInfo from './pages/JobSeekerProps/ImageInfo';
import JobSeekerLogin from './pages/JobSeekerProps/JobSeekerLogin';
import EmployerLogin from './pages/Employer/EmployerLogin';
import Profile from './pages/JobSeekerProps/Profile';
import Resume from './pages/JobSeekerProps/Resume';
import InformationPage from './pages/JobSeekerProps/InformationPage';
import Information from './layouts/Dashboard/Information';

const Routes = () => {
  return (
    <div>
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
        <Route path='/sitemap' element={<SiteMap />} />
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
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/profile/:id/resume' element={<Resume />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/informationPage' element={<InformationPage />} />
      </Routes>
    </div>
  );
};

export default Routes;