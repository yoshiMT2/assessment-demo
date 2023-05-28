/* eslint-disable react/prop-types */
import { Radar, RadarChart as RadarChartBase, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: '協調性',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'リーダーシップ',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: '計画性',
    A: 99,
    B: 140,
    fullMark: 150,
  },
  {
    subject: '積極性',
    A: 125,
    B: 90,
    fullMark: 150,
  },
  {
    subject: '独創性',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

function RadarChart({ showThirdPerson }) {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChartBase cx="45%" cy="50%" outerRadius="70%" data={data} fill="#f3f6f4">
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: '14px' }} />
        {/* <PolarRadiusAxis /> */}
        <Radar name="Mike" dataKey="A" stroke="#FF0000" fillOpacity={0} strokeWidth={5} />
        {showThirdPerson && (
          <Radar name="BOb" dataKey="B" stroke="#0000FF" fill="#8884d8" fillOpacity={0} strokeWidth={5} />
        )}
      </RadarChartBase>
    </ResponsiveContainer>
  );
}
export default RadarChart
