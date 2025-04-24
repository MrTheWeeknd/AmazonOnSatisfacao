const Storage = {
    keyResponses: 'responses',
  
    getResponses() {
      return JSON.parse(localStorage.getItem(this.keyResponses) || '[]');
    },
    saveResponse(resp) {
      const all = this.getResponses();
      all.push(resp);
      localStorage.setItem(this.keyResponses, JSON.stringify(all));
    }
  };