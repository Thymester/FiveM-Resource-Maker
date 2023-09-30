import React, { useState, useEffect } from 'react';
import './FileCreator.css';
import Button from './Button';
import JSZip from 'jszip';

const FileCreator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('Default');

  useEffect(() => {
    setSelectedTemplate('Default');
  }, []);

  const createResourceLuaFile = () => {
    let content = '';
    let content2 = '';
    let fileName = '';
  
    if (selectedTemplate === 'MapTemplate') {
      content = `resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'\n\nthis_is_a_map 'yes'\ndata_file 'DLC_ITYP_REQUEST' 'stream/props.ytyp'\n`;
      fileName = 'MapTemplate.zip';
  
      const zip = new JSZip();
      zip.file('__resource.lua', content);
  
      const streamFolderContent = {
        'example_map_stream.ytyp': '<!-- Add map stream data here -->',
      };
  
      const streamFolder = zip.folder('stream');
      Object.keys(streamFolderContent).forEach(item => {
        streamFolder.file(item, streamFolderContent[item]);
      });
  
      zip.generateAsync({ type: 'blob' }).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    } else if (selectedTemplate === 'VehiclesTemplate') {
      content = `resource_manifest_version '77731fab-63ca-442c-a67b-abc70f28dfa5'\n\nfiles {\n    'vehicles.meta',\n    'carvariations.meta',\n    'carcols.meta',\n    'handling.meta',\n    'vehiclelayouts.meta',\n}\n\ndata_file 'HANDLING_FILE' 'handling.meta'\ndata_file 'VEHICLE_METADATA_FILE' 'vehicles.meta'\ndata_file 'CARCOLS_FILE' 'carcols.meta'\ndata_file 'VEHICLE_VARIATION_FILE' 'carvariations.meta'\ndata_file 'VEHICLE_LAYOUTS_FILE' 'vehiclelayouts.meta'\n`;
      content2 = `https://forum.cfx.re/t/how-to-quick-tutorial-how-to-use-custom-sounds/4059006`;
      fileName = 'VehiclesTemplate.zip';
  
      const zip = new JSZip();
  
      // Create a folder for stream and data
      const streamFolderContent = {
        'example_vehicle_stream.ytyp': '<!-- Add vehicle stream data here -->',
      };
  
      const dataFolderContent = {
        'example_vehicle_data.txt': 'Some vehicle data',
      };
  
      const streamFolder = zip.folder('stream');
      const dataFolder = zip.folder('data');
  
      Object.keys(streamFolderContent).forEach(item => {
        streamFolder.file(item, streamFolderContent[item]);
      });
  
      Object.keys(dataFolderContent).forEach(item => {
        dataFolder.file(item, dataFolderContent[item]);
      });
  
      zip.file('__resource.lua', content);
      zip.file('HowToAddRELFiles.txt', content2);
  
      zip.generateAsync({ type: 'blob' }).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    } else {
      content = `resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'\n\nclient_script 'client.lua'\nserver_script 'server.lua'\n`;
      fileName = '__resource.lua';
  
      const zip = new JSZip();
      zip.file('__resource.lua', content);
  
      zip.generateAsync({ type: 'blob' }).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  };

  const createEUPTemplate = () => {
    const eupContent = {
      'example.meta': '<!-- Add meta data here -->',
      'fxmanifest.lua': `
        fx_version 'cerulean'
        game 'gta5'

        client_script 'client.lua'

        -- Add more script entries if needed

        files {
            'example.meta',
        }

        -- Add any other files needed
      `,
    };

    const zip = new JSZip();
    const eupFolder = zip.folder('EUPTemplate');

    Object.keys(eupContent).forEach(file => {
      eupFolder.file(file, eupContent[file]);
    });

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

  const handleTemplateChange = event => {
    setSelectedTemplate(event.target.value);
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

      <p>Click the button to create templates based on the dropdown menu above.</p>
      <Button onClick={createResourceLuaFile} label="Create Templates" />

      <p>Click the button to create a new EUP Template folder.</p>
      <Button onClick={createEUPTemplate} label="Create EUP Template" />
    </div>
  );
};

export default FileCreator;
