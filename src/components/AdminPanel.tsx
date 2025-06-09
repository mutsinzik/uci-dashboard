import React, { useState } from 'react';
import { Settings, Save, X, Plus, Trash2, Edit3 } from 'lucide-react';

interface AdminPanelProps {
  config: any;
  onSave: (newConfig: any) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ config, onSave, onClose }) => {
  const [editedConfig, setEditedConfig] = useState(JSON.parse(JSON.stringify(config)));

  const handleSave = () => {
    onSave(editedConfig);
    onClose();
  };

  const updateNestedValue = (path: string[], value: any) => {
    const newConfig = JSON.parse(JSON.stringify(editedConfig));
    let current = newConfig;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setEditedConfig(newConfig);
  };

  const addArrayItem = (path: string[], newItem: any) => {
    const newConfig = JSON.parse(JSON.stringify(editedConfig));
    let current = newConfig;
    
    for (const key of path) {
      current = current[key];
    }
    
    current.push(newItem);
    setEditedConfig(newConfig);
  };

  const removeArrayItem = (path: string[], index: number) => {
    const newConfig = JSON.parse(JSON.stringify(editedConfig));
    let current = newConfig;
    
    for (const key of path) {
      current = current[key];
    }
    
    current.splice(index, 1);
    setEditedConfig(newConfig);
  };

  const updateArrayItem = (path: string[], index: number, field: string, value: any) => {
    const newConfig = JSON.parse(JSON.stringify(editedConfig));
    let current = newConfig;
    
    for (const key of path) {
      current = current[key];
    }
    
    current[index][field] = value;
    setEditedConfig(newConfig);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Settings className="mr-3" />
            Dashboard Admin Panel
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          <div className="space-y-8">
            
            {/* Event Settings */}
            <section className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Event Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Event Start Date</label>
                  <input
                    type="datetime-local"
                    value={editedConfig.eventStartDate.slice(0, 16)}
                    onChange={(e) => updateNestedValue(['eventStartDate'], e.target.value + ':00')}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Event Dates Display</label>
                  <input
                    type="text"
                    value={editedConfig.overview.eventDates}
                    onChange={(e) => updateNestedValue(['overview', 'eventDates'], e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Media Accreditation */}
            <section className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Media Accreditation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Total Applications</label>
                  <input
                    type="number"
                    value={editedConfig.mediaAccreditation.totalApplications}
                    onChange={(e) => updateNestedValue(['mediaAccreditation', 'totalApplications'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Approved</label>
                  <input
                    type="number"
                    value={editedConfig.mediaAccreditation.approved}
                    onChange={(e) => updateNestedValue(['mediaAccreditation', 'approved'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pending</label>
                  <input
                    type="number"
                    value={editedConfig.mediaAccreditation.pending}
                    onChange={(e) => updateNestedValue(['mediaAccreditation', 'pending'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Accreditations</label>
                  <input
                    type="number"
                    value={editedConfig.mediaAccreditation.targetAccreditations}
                    onChange={(e) => updateNestedValue(['mediaAccreditation', 'targetAccreditations'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Influencers Engaged</label>
                  <input
                    type="number"
                    value={editedConfig.mediaAccreditation.influencersEngaged}
                    onChange={(e) => updateNestedValue(['mediaAccreditation', 'influencersEngaged'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Influencer Reach</label>
                  <input
                    type="text"
                    value={editedConfig.mediaAccreditation.influencerReach}
                    onChange={(e) => updateNestedValue(['mediaAccreditation', 'influencerReach'], e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Ticket Purchases */}
            <section className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Ticket Purchases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tickets Sold</label>
                  <input
                    type="number"
                    value={editedConfig.ticketPurchases.ticketsSold}
                    onChange={(e) => updateNestedValue(['ticketPurchases', 'ticketsSold'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ticket Target</label>
                  <input
                    type="number"
                    value={editedConfig.ticketPurchases.ticketTarget}
                    onChange={(e) => updateNestedValue(['ticketPurchases', 'ticketTarget'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rwanda Origin %</label>
                  <input
                    type="number"
                    value={editedConfig.ticketPurchases.originRwanda}
                    onChange={(e) => updateNestedValue(['ticketPurchases', 'originRwanda'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Europe Origin %</label>
                  <input
                    type="number"
                    value={editedConfig.ticketPurchases.originEurope}
                    onChange={(e) => updateNestedValue(['ticketPurchases', 'originEurope'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">North America Origin %</label>
                  <input
                    type="number"
                    value={editedConfig.ticketPurchases.originNorthAmerica}
                    onChange={(e) => updateNestedValue(['ticketPurchases', 'originNorthAmerica'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Content Milestones */}
            <section className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Content Milestones</h3>
                <button
                  onClick={() => addArrayItem(['communicationProgram', 'contentMilestones'], {
                    id: Date.now(),
                    title: 'New Milestone',
                    completed: false
                  })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
                >
                  <Plus size={16} className="mr-1" />
                  Add Milestone
                </button>
              </div>
              <div className="space-y-3">
                {editedConfig.communicationProgram.contentMilestones.map((milestone: any, index: number) => (
                  <div key={milestone.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-md">
                    <input
                      type="checkbox"
                      checked={milestone.completed}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'contentMilestones'], index, 'completed', e.target.checked)}
                      className="w-4 h-4 text-indigo-600 bg-gray-600 border-gray-500 rounded focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'contentMilestones'], index, 'title', e.target.value)}
                      className="flex-1 px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => removeArrayItem(['communicationProgram', 'contentMilestones'], index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Social Media Metrics */}
            <section className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Social Media Metrics</h3>
                <button
                  onClick={() => addArrayItem(['communicationProgram', 'socialMediaMetrics'], {
                    platform: 'New Platform',
                    followers: '0',
                    engagement: '0%'
                  })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
                >
                  <Plus size={16} className="mr-1" />
                  Add Platform
                </button>
              </div>
              <div className="space-y-3">
                {editedConfig.communicationProgram.socialMediaMetrics.map((metric: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-700 rounded-md">
                    <input
                      type="text"
                      placeholder="Platform"
                      value={metric.platform}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'socialMediaMetrics'], index, 'platform', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Followers"
                      value={metric.followers || ''}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'socialMediaMetrics'], index, 'followers', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Engagement"
                      value={metric.engagement || ''}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'socialMediaMetrics'], index, 'engagement', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => removeArrayItem(['communicationProgram', 'socialMediaMetrics'], index)}
                      className="text-red-400 hover:text-red-300 justify-self-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Digital Ad Performance */}
            <section className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Digital Ad Performance</h3>
                <button
                  onClick={() => addArrayItem(['communicationProgram', 'digitalAdPerformance'], {
                    channel: 'New Channel',
                    impressions: '0',
                    clicks: '0',
                    conversions: '0%'
                  })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
                >
                  <Plus size={16} className="mr-1" />
                  Add Channel
                </button>
              </div>
              <div className="space-y-3">
                {editedConfig.communicationProgram.digitalAdPerformance.map((ad: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 bg-gray-700 rounded-md">
                    <input
                      type="text"
                      placeholder="Channel"
                      value={ad.channel}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'digitalAdPerformance'], index, 'channel', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Impressions"
                      value={ad.impressions}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'digitalAdPerformance'], index, 'impressions', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Clicks"
                      value={ad.clicks}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'digitalAdPerformance'], index, 'clicks', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Conversions"
                      value={ad.conversions}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'digitalAdPerformance'], index, 'conversions', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => removeArrayItem(['communicationProgram', 'digitalAdPerformance'], index)}
                      className="text-red-400 hover:text-red-300 justify-self-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Activations */}
            <section className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Activations</h3>
                <button
                  onClick={() => addArrayItem(['communicationProgram', 'activations'], {
                    name: 'New Activation',
                    status: 'Pending',
                    date: 'TBD'
                  })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
                >
                  <Plus size={16} className="mr-1" />
                  Add Activation
                </button>
              </div>
              <div className="space-y-3">
                {editedConfig.communicationProgram.activations.map((activation: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-700 rounded-md">
                    <input
                      type="text"
                      placeholder="Activation Name"
                      value={activation.name}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'activations'], index, 'name', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select
                      value={activation.status}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'activations'], index, 'status', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Date"
                      value={activation.date}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'activations'], index, 'date', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => removeArrayItem(['communicationProgram', 'activations'], index)}
                      className="text-red-400 hover:text-red-300 justify-self-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Media Coverage */}
            <section className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Media Coverage</h3>
                <button
                  onClick={() => addArrayItem(['communicationProgram', 'mediaCoverage'], {
                    title: 'New Article',
                    source: 'Source',
                    url: 'https://'
                  })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
                >
                  <Plus size={16} className="mr-1" />
                  Add Article
                </button>
              </div>
              <div className="space-y-3">
                {editedConfig.communicationProgram.mediaCoverage.map((article: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-700 rounded-md">
                    <input
                      type="text"
                      placeholder="Article Title"
                      value={article.title}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'mediaCoverage'], index, 'title', e.target.value)}
                      className="md:col-span-2 px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Source"
                      value={article.source}
                      onChange={(e) => updateArrayItem(['communicationProgram', 'mediaCoverage'], index, 'source', e.target.value)}
                      className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="URL"
                        value={article.url}
                        onChange={(e) => updateArrayItem(['communicationProgram', 'mediaCoverage'], index, 'url', e.target.value)}
                        className="flex-1 px-3 py-1 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => removeArrayItem(['communicationProgram', 'mediaCoverage'], index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md flex items-center"
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;