/* eslint-disable react/prop-types */
import { Radar, RadarChart as RadarChartBase, PolarGrid, PolarRadiusAxis, PolarAngleAxis, ResponsiveContainer } from 'recharts';


function SimpleRadarChart({ isFirst, scores }) {

  const data = scores
    ? scores.map((s, i) => ({
      A: scores[i],
      fullMark: 4
    }))
    : null

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChartBase cx="50%" cy="45%" outerRadius="80%" data={data} fill="#f3f6f4">
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: '12px' }} radius="40%" />
        <PolarRadiusAxis axisLine={false} angle={30} domain={[0, 4]} />
        {isFirst
          ? <Radar name="1st" dataKey="A" stroke="#FF0000" fillOpacity={0} strokeWidth={5} max={4} />
          : <Radar name="1st" dataKey="A" stroke="#0000FF" fillOpacity={0} strokeWidth={5} max={4} />
        }
      </RadarChartBase>
    </ResponsiveContainer>
  );
}
export default SimpleRadarChart
