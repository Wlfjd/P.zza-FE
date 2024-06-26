import { TopNav } from '../../components/TopNav/TopNav';
import { useEffect, useState } from 'react';
import { Button } from '../../components/button/Button';

import { useNavigate } from 'react-router-dom';
import { CreateTitle } from './step1-title/CreateTitle';
import { SelectGuide } from './step2-type/SelectGuide';
import { SelectMem } from './step3-member/SelectMem';
import { ExplainProject } from './step4-intro/ExplainProject';
import { CreateDone } from './step5-finish/CreateDone';
import Header from '../../components/elements/Header';
import './CreateProject.scss';

const INITAIL = {
  project_name: '',
  period: '',
  project_desc: '',
  chat_url: '',
  team_members: [
    {
      role: '',
      recruitment_target: 0,
    },
  ],
};

export function CreateProject() {
  const navigate = useNavigate();
  const [valueStep, setValueStep] = useState(1);
  const [isClick, setIsClick] = useState(false);
  const [values, setValues] = useState(INITAIL);

  console.log(values);
  console.log(valueStep);

  const handleChange = (name, val) => {
    const newValues = values;
    newValues[name] = val;
    setValues(newValues);
    console.log(values);
  };

  useEffect(() => {
    localStorage.setItem('project', []);
    if (valueStep === 5) {
      localStorage.setItem('project', JSON.stringify(values));
    }
  }, [valueStep, values]);

  const renderContent = () => {
    switch (valueStep) {
      case 1:
        return (
          <CreateTitle
            name="project_name"
            step={valueStep}
            value={values.project_name}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <SelectGuide
            name="period"
            step={valueStep}
            value={values.period}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <SelectMem
            name="team_members"
            step={valueStep}
            value={values.team_members}
            onChange={handleChange}
          />
        );
      case 4:
        return (
          <ExplainProject
            desc_name="project_desc"
            url_name="chat_url"
            step={valueStep}
            desc={values.project_desc}
            chat_url={values.chat_url}
            onChange={handleChange}
          />
        );
      case 5:
        return <CreateDone />;
      case 6:
        navigate('../mainpage');
      default:
        return null;
    }
  };

  return (
    <>
      <Header
        title="프로젝트 생성"
        valueStep={valueStep}
        onChange={(value) => setValueStep(value)}
      ></Header>
      <div className="topic-container">{renderContent()}</div>
      <Button
        className={`button ${isClick ? 'clicked' : ''}`}
        onClick={() => {
          setValueStep(valueStep + 1);
          setIsClick(true);
        }}
      >
        {valueStep === 5 ? '홈으로' : '다음'}
      </Button>
    </>
  );
}
