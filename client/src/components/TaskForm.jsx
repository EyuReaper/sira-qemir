import { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'ርዕስ ያስፈልጋል';
    else if (formData.title.length < 3) newErrors.title = 'ርዕስ ቢያንስ 3 ፊደሎች መሆን አለበት';
    if (formData.description.length > 500) newErrors.description = 'መግለጫ ከ500 ፊደሎች መብለጥ አይችልም';
    if (!formData.dueDate) newErrors.dueDate = 'የማብቂያ ቀን ያስፈልጋል';
    else {
      const today = new Date().toISOString().split('T')[0];
      if (formData.dueDate < today) newErrors.dueDate = 'የማብቂያ ቀን ዛሬ ወይም ከዚያ በኋላ መሆን አለበት';
    }
    if (!['low', 'medium', 'high'].includes(formData.priority)) newErrors.priority = 'ቅድሚያ ዝቅተኛ፣ መካከለኛ ወይም ከፍተኛ መሆን አለበት';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', description: '', dueDate: '', priority: 'medium' });
    setErrors({});
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg dark:bg-gray-900/30 dark:backdrop-blur-md dark:border dark:border-gray-500/20 animate-slide-in">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">አዲስ ተግባር ፍጠር</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">ርዕስ</label>
          <input
            type="text"
            value={formData.title}
            onChange={handleChange('title')}
            className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover`}
            placeholder="የተግባር ርዕስ"
            aria-invalid={errors.title ? 'true' : 'false'}
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">መግለጫ</label>
          <textarea
            value={formData.description}
            onChange={handleChange('description')}
            className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover`}
            placeholder="የተግባር መግለጫ"
            rows="4"
            aria-invalid={errors.description ? 'true' : 'false'}
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">የማብቂያ ቀን</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={handleChange('dueDate')}
            className={`w-full px-3 py-2 border ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover`}
            aria-invalid={errors.dueDate ? 'true' : 'false'}
          />
          {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">ቅድሚያ</label>
          <select
            value={formData.priority}
            onChange={handleChange('priority')}
            className={`w-full px-3 py-2 border ${errors.priority ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-400 glow-on-hover`}
            aria-invalid={errors.priority ? 'true' : 'false'}
          >
            <option value="low">ዝቅተኛ</option>
            <option value="medium">መካከለኛ</option>
            <option value="high">ከፍተኛ</option>
          </select>
          {errors.priority && <p className="mt-1 text-xs text-red-500">{errors.priority}</p>}
        </div>
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="w-full px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-500 animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ተግባር ፍጠር
        </button>
      </form>
    </div>
  );
}

export default TaskForm;