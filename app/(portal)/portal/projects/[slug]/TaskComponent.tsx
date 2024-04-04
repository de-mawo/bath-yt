"use client";

import { Task } from "@prisma/client";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import "highlight.js/styles/atom-one-dark.css";
import { useEffect } from "react";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('css', css);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('xml', xml);

type Props = {
  tasks: Task[];
};

const TaskComponent = ({ tasks }: Props) => {

  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <>
      {tasks.map((task) => (
        <div className="my-4" key={task.id}>
          <div className="flex items-center font-semibold">
            <span> {task.number}.</span> <p>{task.title}</p>
          </div>
          <div>
            <p>{task.question}</p>
            <ul className=" space-y-1  list-disc list-inside ">
              {task.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="m-4 overflow-x-auto">
            <h4 className="font-semibold leading-tight  lg:text-lg">
              Expected Output
            </h4>
            <div className=" max-w-lg">
            <pre className="bg-slate-100 p-3 dark:bg-slate-800 text-pretty">
              <code className={`language-${task.progLang}`}>{task.demo}</code>
            </pre>
  
            </div>
            
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskComponent;
