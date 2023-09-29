import React, { useState, useEffect } from 'react';
import './FileCreator.css';
import Button from './Button';
import JSZip from 'jszip';

const FileCreator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('Default');

  useEffect(() => {
    // Set the default selected template when the component mounts
    setSelectedTemplate('Default');
  }, []);

  const initiateDownload = (content, fileName) => {
    const zip = new JSZip();
    const folder = zip.folder(fileName);

    Object.keys(content).forEach(file => {
      folder.file(file, content[file]);
    });

    zip.generateAsync({ type: 'blob' }).then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const handleTemplateChange = event => {
    setSelectedTemplate(event.target.value);
  };

  const createResourceLuaFile = () => {
    let content = '';

    if (selectedTemplate === 'Default') {
      content = `resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'\n\nclient_script 'client.lua'\nserver_script 'server.lua'\n`;
    } else if (selectedTemplate === 'MapTemplate') {
      content = `resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'\n\nthis_is_a_map 'yes'\ndata_file 'DLC_ITYP_REQUEST' 'stream/props.ytyp'\n`;
    } else if (selectedTemplate === 'VehiclesTemplate') {
      content = `resource_manifest_version '77731fab-63ca-442c-a67b-abc70f28dfa5'\n\nfiles {\n    'vehicles.meta',\n    'carvariations.meta',\n    'carcols.meta',\n    'handling.meta',\n    'vehiclelayouts.meta',\n}\n\ndata_file 'HANDLING_FILE' 'handling.meta'\ndata_file 'VEHICLE_METADATA_FILE' 'vehicles.meta'\ndata_file 'CARCOLS_FILE' 'carcols.meta'\ndata_file 'VEHICLE_VARIATION_FILE' 'carvariations.meta'\ndata_file 'VEHICLE_LAYOUTS_FILE' 'vehiclelayouts.meta'\n`;
    }

    // Create a Blob with the content and initiate file download
    initiateDownload(content, '__resource.lua');
  };

  const createEUPTemplate = () => {
    const folderContent = {
      'example.meta': '<!-- Add meta data here -->',
      'fxmanifest.lua': `
        fx_version 'cerulean'
        game 'gta5'
  
        client_script 'client.lua'
  
        -- Add more script entries if needed
  
        files {
            'example.meta',
        }
      `,
      'stream': {
        'placeholder.txt': 'This file is not needed and was only created to fullfil the JSZip library requirements'
      }
    };
  
    // Create a Blob with the folder content and initiate file download
    const zip = new JSZip();
  
    const addFolderContent = (folder, content) => {
      Object.keys(content).forEach(item => {
        if (typeof content[item] === 'object') {
          const subFolder = folder.folder(item);
          addFolderContent(subFolder, content[item]);
        } else {
          folder.file(item, content[item]);
        }
      });
    };
  
    addFolderContent(zip, folderContent);
  
    zip.generateAsync({ type: 'blob' }).then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EUPTemplate.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div className="file-creator">
      <div className="template-dropdown">
        <label htmlFor="templateSelect">Select Template:</label>
        <select
          id="templateSelect"
          value={selectedTemplate}
          onChange={handleTemplateChange}
        >
          <option value="Default">Default</option>
          <option value="MapTemplate">Map Template</option>
          <option value="VehiclesTemplate">Vehicles Template</option>
        </select>
      </div>

      <p>Click the button to create a new __resource.lua file.</p>
      <Button onClick={createResourceLuaFile} label="Create __resource.lua" />
      <Button onClick={createEUPTemplate} label="Create EUP Template" />
    </div>
  );
};

export default FileCreator;
