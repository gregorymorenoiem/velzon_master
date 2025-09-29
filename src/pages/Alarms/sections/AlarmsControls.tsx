import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Label, Input } from 'reactstrap';

const AlarmsControls: React.FC = () => {
    const [relay1, setRelay1] = useState(false);
    const [relay2, setRelay2] = useState(false);

    return (
        <Card>
            <CardHeader>
                <h4 className="card-title mb-0">Control de Relés</h4>
            </CardHeader>
            <CardBody>
                <p className="text-muted">Activa o desactiva los relés del sistema de forma remota.</p>
                <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                    <Label className="form-label fw-medium fs-15 mb-0">Relé 1 (Principal)</Label>
                    <div className="form-check form-switch form-switch-lg">
                        <Input type="checkbox" className="form-check-input" checked={relay1} onChange={() => setRelay1(!relay1)} />
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-3">
                    <Label className="form-label fw-medium fs-15 mb-0">Relé 2 (Respaldo)</Label>
                    <div className="form-check form-switch form-switch-lg">
                        <Input type="checkbox" className="form-check-input" checked={relay2} onChange={() => setRelay2(!relay2)} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default AlarmsControls;