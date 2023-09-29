import React from 'react';
import './FileCreator.css';
import Button from './Button';

const FileCreator = () => {
  const createResourceLuaFile = () => {
    const content = `resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'\n\nclient_script 'client.lua'\nserver_script 'server.lua'\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '__resource.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="file-creator">
      <p>Click the button to create a new __resource.lua file.</p>
      <Button onClick={createResourceLuaFile} />
    </div>
  );
};

export default FileCreator;
