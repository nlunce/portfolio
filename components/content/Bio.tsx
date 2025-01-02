// Bio.tsx
import React from 'react';
import LineNumberedText from '../LineNumberedText'; // Adjust the import path as needed

const Bio: React.FC = () => {
  // Define the bio text
  const bioText = `
# About Me

I am a full-stack developer and educator with a strong foundation in computer science and mathematics. I graduated Summa Cum Laude from BYU-Idaho with a Bachelor of Science in Computer Science, emphasizing Machine Learning, and a minor in Mathematics. My academic journey has been shaped by a passion for solving complex problems and a commitment to excellence.

As a Co-Founder and Full-Stack Software Engineer at Luxorum LLC, I’ve had the opportunity to develop modern web applications using frameworks like Next.js and React. I design and implement scalable cloud infrastructure using AWS, Terraform, and other DevOps tools to optimize ETL pipelines and deliver cost-effective, high-quality solutions. To date, I’ve successfully led over 20 projects, addressing diverse client requirements and delivering innovative outcomes.

My background also includes time as a Math Instructor at Mathnasium, where I tutored K-12 students in algebra, trigonometry, and calculus. I developed personalized learning plans and provided one-on-one and group instruction to help students improve comprehension and test scores, with more than 80% of my students experiencing significant progress. Creating a positive learning environment and fostering strong communication were key aspects of my role.

Additionally, I have experience in sales and client relations from my time at Sunder Energy/Freedom Forever, where I managed door-to-door sales and appointment setting, engaging with over 4,000 homeowners and closing deals that generated more than $600,000 in revenue. This experience sharpened my skills in negotiation, customer satisfaction, and delivering tailored solutions.

In terms of technical expertise, I’m proficient in programming languages like JavaScript, Python, C#, and Go, with a focus on full-stack web development. My experience with cloud technologies includes AWS (S3, DynamoDB, Cognito, Lambda, API Gateway, CloudFront), Terraform, and DevOps practices. I’m also passionate about data science and machine learning, leveraging tools like TensorFlow, PyTorch, Pandas, and Scikit-learn to solve data-driven challenges.

Outside of work, I’m proud to be an Eagle Scout and recipient of the BYU-I Full-Ride Academic Scholarship. I thrive on combining technical innovation with a focus on growth, collaboration, and delivering impactful solutions in every project I take on.
  `;

  return (
    <div className='xl:w-2/3 text-off-white'>
      <LineNumberedText
        text={bioText}
        lineNumberClassName='pr-7 text-right text-foreground'
        contentClassName='flex-1 max-w-2/3 leading-6'
        containerClassName='flex'
        lineHeightMultiplier={1.2} // Adjust if necessary
        debounceDelay={30} // Adjust if necessary
      />
    </div>
  );
};

export default Bio;
